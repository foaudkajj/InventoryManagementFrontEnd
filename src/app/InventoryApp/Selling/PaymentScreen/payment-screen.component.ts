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

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.scss']
})
export class PaymentScreenComponent implements OnInit {

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
  customerInfo: CustomerInfoDto = { CustomerName: '', CustomerPhone: '' };
  customerInfoList: CustomerInfoDto[];
  @ViewChild("customerInfoSelectBox") customerInfoSelectbox: DxLookupComponent;

  constructor(public translate: TranslateService,
    private paymentMethods: PaymentMethodsService,
    private consumerInfo: ConsumerInfosService,
    public dialogRef: MatDialogRef<PaymentScreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.paymentMethods.GetPaymentMethods().toPromise().then((res: { data: PaymentMethod[] }) => this.paymentsMD = res.data);
    this.consumerInfo.GetConsumerInfos().toPromise().then((res: { data: CustomerInfoDto[] }) => this.customerInfoList = res.data)
    this.InitlizeFormTable();

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
      value.CustomerInfo.Id = this.customerInfoSelectbox.instance.option('value')?.Id ?? 0;
      console.log(this.customerInfoSelectbox.instance.option('value'))
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

    if (e.value) {
      this.customerInfo.CustomerName = e.value.CustomerName;
      this.customerInfo.CustomerPhone = e.value.CustomerPhone;
      this.customerInfo.Id = e.value.Id;
    } else {
      this.customerInfo.CustomerName = null;
      this.customerInfo.CustomerPhone = null;
      this.customerInfo.Id = 0;
    }
  }

}
