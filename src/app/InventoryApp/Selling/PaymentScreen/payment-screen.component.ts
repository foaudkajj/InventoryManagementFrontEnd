import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PaymentMethod } from 'app/InventoryApp/Models/PaymentMethod';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentMethodsService } from 'app/InventoryApp/services/payment-methods.service';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentPopup } from 'app/InventoryApp/Models/DTOs/PaymentPopup';
import { CustomerInfoDto } from 'app/InventoryApp/Models/DTOs/CustomerInfoDto';
import { ConsumerInfosService } from 'app/InventoryApp/services/ConsumerInfo.service';
import { DxLookupComponent } from 'devextreme-angular';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import DataSource from 'devextreme/data/data_source';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.scss']
})
export class PaymentScreenComponent implements OnInit {
  Math = Math;
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
  customerInfo: CustomerInfoDto = { Id: 0, CustomerName: '', CustomerPhone: '' };
  customerInfoId: number = 0;
  customerInfoList: CustomerInfoDto[];
  @ViewChild("customerInfoSelectBox") customerInfoSelectbox: DxLookupComponent;
  customersSelectBoxDatasource: DataSource;
  Total: number = 0;
  constructor(public translate: TranslateService,
    private paymentMethods: PaymentMethodsService,
    public dialogRef: MatDialogRef<PaymentScreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private dxStore: DxStoreService) { }

  ngOnInit() {
    this.Total = this.data.Total;
    this.customerInfoId = this.data.CustomerInfoId;
    this.customerInfo.Id = this.data.CustomerInfoId;
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
        Validators.max((this.data - this.TotalPaied))
      ])],
    });
  }

  changeValue(value: PaymentMethod) {
    this.IsDefferedPayment = value.PaymentType;
    this.selectedPayment = value;
  }

  AddToPaymentMethodsTable() {
    this.paymentsMD = this.paymentsMD.filter(fi => fi.Id != this.PaymentMethodsTableFormGroup.controls.Payment.value.Id);
    this.AddedPayments.push({ CustomerInfo: { CustomerName: this.customerInfo.CustomerName, CustomerPhone: this.customerInfo.CustomerPhone }, Receipt: this.ReceiptCode, PaymentMethodId: this.PaymentMethodsTableFormGroup.controls.Payment.value.Id, Amount: this.PaymentMethodsTableFormGroup.controls.Amount.value, PaymentName: this.PaymentMethodsTableFormGroup.controls.Payment.value.PaymentName, DefferedPaymentCount: (this.PaymentMethodsTableFormGroup.controls.DefferedPaymentCount.value || 1) });
    this.dataSource.data = this.AddedPayments;
    this.PaymentMethodsTableFormGroup.controls.Amount.setValidators(Validators.max((this.data - this.getTotal())));
    this.PaymentMethodsTableFormGroup.updateValueAndValidity();
    this.PaymentMethodsTableFormGroup.reset();
    this.cdr.detectChanges();
  }

  ClosePopup() {
    this.AddedPayments = this.dataSource.data.map(value => {
      value.Receipt = this.ReceiptCode;
      value.CustomerInfo.CustomerName = this.customerInfo.CustomerName;
      value.CustomerInfo.CustomerPhone = this.customerInfo.CustomerPhone;
      value.CustomerInfo.Id = this.customerInfoSelectbox.instance.option('value')?.Id ?? this.customerInfoId;
      // console.log(this.customerInfoSelectbox.selectedItem)
      return value;
    });
    this.dialogRef.close(this.dataSource.data)
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
    console.log(e)
    if (e.value) {
      this.customerInfo = { Id: e.value.Id, CustomerName: e.value.CustomerName, CustomerPhone: e.value.CustomerPhone };
    } else {
      this.customerInfo = { Id: 0, CustomerName: null, CustomerPhone: null };
    }
  }

}
