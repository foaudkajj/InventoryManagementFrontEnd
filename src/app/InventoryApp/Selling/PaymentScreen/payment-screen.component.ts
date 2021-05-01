import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PaymentMethod } from 'app/InventoryApp/Models/PaymentMethod';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentMethodsService } from 'app/InventoryApp/services/payment-methods.service';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentPopup } from 'app/InventoryApp/Models/DTOs/PaymentPopup';
import { CustomerInfoDto } from 'app/InventoryApp/Models/DTOs/CustomerInfoDto';
import { ConsumerInfosService } from 'app/InventoryApp/services/ConsumerInfo.service';
import { DxFormComponent, DxLookupComponent } from 'devextreme-angular';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import DataSource from 'devextreme/data/data_source';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.scss']
})
export class PaymentScreenComponent implements OnInit, AfterViewInit {
  Math = Math;
  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  selectedPayment: PaymentMethod;
  IsDefferedPayment: boolean = false;
  // Payments from Master Data
  paymentsMD: PaymentMethod[];
  DefferedPaymentCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  // This is used to specify the columns we need to show in the grid.
  displayedColumnsInGrid = ['PaymentName', 'DefferedPaymentCount', 'Amount']
  AddedPayments: PaymentPopup[] = [];
  TotalPaied: number = 0;
  PaymentMethodsTableFormGroup: FormGroup;
  ReceiptCode: string;
  customerInfoId: number = 6;
  customerInfoList: CustomerInfoDto[];
  IsChangeRefund = false;
  @ViewChild("customerInfoSelectBox") customerInfoSelectbox: DxLookupComponent;
  @ViewChild("formInstance") formInstance: DxFormComponent;
  customersSelectBoxDatasource: DataSource;
  Total: number = 0;
  containsNumberReg = /\d/;
  toolTipVisibility = false;
  formSubmitButtonOptions: any = {
    text: this.translate.instant('SELLING_MODULE.NORMAL_SALE.SALES_SCREEN.COMPLETE_PAYMENT'),
    type: "success",
    useSubmitBehavior: true,
    onClick: () => this.ClosePopup(),
    disabled: (this.Total - this.TotalPaied) >= 1 || this.dataSource.data.length == 0
  }
  constructor(public translate: TranslateService,
    private paymentMethods: PaymentMethodsService,
    public dialogRef: MatDialogRef<PaymentScreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private dxStore: DxStoreService) {
    this.customerInfoValueChanged = this.customerInfoValueChanged.bind(this);
    this.ChnageSubmitButtonDisablility = this.ChnageSubmitButtonDisablility.bind(this);
  }
  ngAfterViewInit(): void {
    if (this.customerInfoId > 0) {
      var customerInfoEditor = this.formInstance.instance.getEditor("CustomerInfo");
      customerInfoEditor.option('value', this.customerInfoId);
      this.formInstance.instance.itemOption("CustomerInfo", "disabled", true);
      this.formInstance.instance.itemOption("CustomerInfo", "colSpan", 2);
      this.formInstance.instance.itemOption("CustomerPhone", "visible", false);
    }
  }

  ngOnInit() {
    this.Total = this.data.Total;
    this.IsChangeRefund = this.data?.IsChangeRefund ?? false;
    this.customerInfoId = this.data.CustomerInfoId;
    this.paymentMethods.GetPaymentMethods().toPromise().then((res: { data: PaymentMethod[] }) => this.paymentsMD = res.data);
    this.initlizeCustomersSelectBox();
    this.InitlizeFormTable();

  }

  initlizeCustomersSelectBox() {

    let storeOptions: DxStoreOptions = {
      loadUrl: "CustomerInfo/Get", Key: "Id"
    };

    this.customersSelectBoxDatasource = new DataSource({
      store: this.dxStore.GetStore(storeOptions),
      paginate: true,
      pageSize: 10
    });
  }

  InitlizeFormTable() {
    this.PaymentMethodsTableFormGroup = this.fb.group({
      Payment: ['', Validators.compose([
        Validators.required
      ])
      ],
      DefferedPaymentCount: [''],
      Amount: ['', Validators.compose([
        Validators.required,
        Validators.max((this.data - this.TotalPaied)),
        Validators.min(0.1)
      ])],
    });
  }

  changeValue(value: PaymentMethod) {
    this.IsDefferedPayment = value.PaymentType;
    this.selectedPayment = value;
  }

  AddToPaymentMethodsTable() {
    this.paymentsMD = this.paymentsMD.filter(fi => fi.Id != this.PaymentMethodsTableFormGroup.controls.Payment.value.Id);
    this.AddedPayments.push({ CustomerInfo: { CustomerName: '', CustomerPhone: '' }, Receipt: this.ReceiptCode, PaymentMethodId: this.PaymentMethodsTableFormGroup.controls.Payment.value.Id, Amount: this.PaymentMethodsTableFormGroup.controls.Amount.value, PaymentName: this.PaymentMethodsTableFormGroup.controls.Payment.value.PaymentName, DefferedPaymentCount: (this.PaymentMethodsTableFormGroup.controls.DefferedPaymentCount.value || 1) });
    this.dataSource.data = this.AddedPayments;
    this.PaymentMethodsTableFormGroup.controls.Amount.setValidators([Validators.max((this.data - this.getTotal())), Validators.required, Validators.min(0.1)]);
    this.PaymentMethodsTableFormGroup.updateValueAndValidity();
    this.PaymentMethodsTableFormGroup.reset();
    this.cdr.detectChanges();
    this.ChnageSubmitButtonDisablility();
  }

  ClosePopup() {
    if (this.formInstance.instance.validate().isValid) {
      if (this.formInstance.instance.option("formData")?.CustomerInfo.Id != 0) {
        this.AddedPayments = this.dataSource.data.map(value => {
          value.Receipt = this.ReceiptCode;
          value.CustomerInfo.Id = this.formInstance.instance.option("formData")?.CustomerInfo.Id;
          return value;
        });
      } else {
        this.AddedPayments = this.dataSource.data.map(value => {
          value.Receipt = this.ReceiptCode;
          value.CustomerInfo.CustomerName = this.formInstance.instance.option("formData")?.CustomerInfo.CustomerName;
          value.CustomerInfo.CustomerPhone = this.formInstance.instance.option("formData")?.CustomerPhone;
          value.CustomerInfo.Id = 0;
          return value;
        });
      }
      console.log(this.AddedPayments)
      this.dialogRef.close(this.dataSource.data)
    }

  }

  getTotal() {
    this.TotalPaied = this.dataSource.data.map(t => t.Amount).reduce((acc, value) => +acc + +value, 0);
    return this.TotalPaied;
  }

  onReceiptCodeKeydownEvent(event) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  }

  onReceiptCodePaste(event) {
    // Removing Spaces from pasted code
    let paste = (event.clipboardData || window.Clipboard).getData('text');
    this.ReceiptCode = paste.replace(/ /g, '');
    event.preventDefault();

  }

  customerInfoValueChanged(e) {
    var secondEditor = this.formInstance.instance.getEditor("CustomerPhone");
    secondEditor.option('value', e.value.CustomerPhone)

    this.ChnageSubmitButtonDisablility();

    if (e.value?.Id > 0) {
      secondEditor.option('disabled', true);
    } else {
      secondEditor.option('disabled', false);
    }
  }

  addCustomerInfoItem(data) {
    if (!data.text) {
      data.customItem = null;
      return;
    }
    let newItem = { CustomerName: data.text, Id: 0, CustomerPhone: '' };
    data.customItem = newItem;
  }

  ChnageSubmitButtonDisablility() {
    let button = this.formInstance.instance.getButton("submitButton");
    if ((this.Total - this.TotalPaied) >= 1 || this.dataSource.data.length == 0) {
      button.option("disabled", true);
    } else {
      button.option("disabled", false);
    }

  }

}


