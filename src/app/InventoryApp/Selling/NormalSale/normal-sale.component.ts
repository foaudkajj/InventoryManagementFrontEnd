import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductView } from 'app/InventoryApp/Models/DTOs/ProductView';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductSellingDto } from 'app/InventoryApp/Models/DTOs/ProductSellingDTO';
import { MatDialog } from '@angular/material/dialog';
import { NormalSatisService } from 'app/InventoryApp/services/normal-satis.service';
import { PaymentPopup } from 'app/InventoryApp/Models/DTOs/PaymentPopup';
import { SalePaymentMethod } from 'app/InventoryApp/Models/DTOs/SalePaymentMethod';
import { Product } from 'app/InventoryApp/Models/Product';
import { DxDataGridComponent, DxTextBoxComponent, DxLookupComponent } from 'devextreme-angular';
import { PaymentScreenComponent } from '../PaymentScreen/payment-screen.component';
import TextBox from "devextreme/ui/text_box";
import { SaleUserBranchProductsDTO } from 'app/InventoryApp/Models/DTOs/SaleUserBranchProductsDTO';

@Component({
  selector: 'app-normal-sale',
  templateUrl: './normal-sale.component.html',
  styleUrls: ['./normal-sale.component.scss']
})
export class NormalSaleComponent implements OnInit {
  RangeStartDate: Date;
  RangeEndDate: Date;
  Genders: any = [{ Value: false, ViewValue: 'Erkek' }, { Value: true, ViewValue: 'Kadın' }]
  // Here I used Material Table
  ProductsToSellDisplayedColumns = ['ProductName', 'ProductFullCode', 'ProductCode', 'ColorName', 'Gender', 'ProductYear', 'SellingPrice', 'Size', 'BranchName', 'actions'];
  ProductsToSellDataSource: any;
  ProductsToSellTableRows: ProductView[] = [];
  @ViewChild("soledProductsGrid") soledProductsGrid: DxDataGridComponent;
  @ViewChild("customerInfoLookup") customerInfoLookup: DxLookupComponent;
  paymentDetailText: string;
  // soledProductsDetailsText: DxDataGridComponent;

  ProductsToSellTotalPrice: number;

  // Here I am using DevExtreme
  displayedColumnsSelledProducts = ['ProductName', 'ProductFullCode', 'ProductCode', 'ColorName', 'Gender', 'ProductYear', 'SellingPrice', 'Size', 'BranchName'];
  SoledProductsDatasource: SaleUserBranchProductsDTO[];

  // I am using this to unsubscribe after leaving component
  private unsubscribe: Subscription[] = [];



  ProductAndPriceFormGroup: FormGroup;

  ProductsToSellTableId: number = 0;
  ProductSellingDto: ProductSellingDto;
  constructor(public _translate: TranslateService,
    private normalSatisSerice: NormalSatisService,
    public dialog: MatDialog,
    private fb: FormBuilder,) { }

  ngOnInit() {
    this.InitlizeSelledProductsDatasource();
    this.InitilizeProductAndPriceForm();

  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }


  InitilizeProductAndPriceForm() {
    this.ProductAndPriceFormGroup = this.fb.group({
      ProductFullCode: ['', Validators.compose([
        Validators.required
      ])
      ],
      SellingPrice: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  InitlizeSelledProductsDatasource() {
    this.normalSatisSerice.GetSoledProductsByUserID(1).toPromise().then((res: SaleUserBranchProductsDTO[]) => {
      this.SoledProductsDatasource = res;
      this.ProductsToSellTableRows = [];
    });
  }

  productView: ProductView;
  AddProduct() {
    this.productView.SellingPrice = this.ProductAndPriceFormGroup.controls.SellingPrice.value;
    this.ProductsToSellTableRows.push(this.productView);
    this.AssingDataToProductsToSellTable();
    this.ProductAndPriceFormGroup.reset();
  }

  AssingDataToProductsToSellTable() {
    this.ProductsToSellDataSource = this.ProductsToSellTableRows;
  }

  DeleteFromProductsToSellTable(row: ProductView) {
    this.ProductsToSellTableRows = this.ProductsToSellTableRows.filter(fi => fi.TempId != row.TempId);
    this.AssingDataToProductsToSellTable();
  }

  getGendere(gender: number) {
    // 0 means Erkek, 1 means Kadin
    return gender ? "Kadın" : "Erkek"
  }

  openSatisDialog() {
    const dialogRef = this.dialog.open(PaymentScreenComponent, {
      height: '600px',
      width: '800px',
      data: this.ProductsToSellTotalPrice = this.ProductsToSellDataSource.map(t => t.SellingPrice).reduce((acc, value) => +acc + +value, 0)
    });

    this.unsubscribe.push(dialogRef.afterClosed().subscribe((result: PaymentPopup[]) => {
      if (result?.length > 0) {
        this.ProductsToSellDataSource = [];
        let PaymentMethodIds: number[] = result.map(value => value.PaymentMethodId);
        let ProductIds: number[] = this.ProductsToSellTableRows.map(value => value.Id);
        let salePaymentMethods: SalePaymentMethod[] = result.map(value => <SalePaymentMethod>{ Amount: value.Amount, DefferedPaymentCount: value.DefferedPaymentCount, PaymentMethodId: value.PaymentMethodId });
        let ProductSellingDto: ProductSellingDto = { CustomerInfoId: result[0].CustomerInfo.Id, CustomerName: result[0].CustomerInfo.CustomerName, CustomerPhone: result[0].CustomerInfo.CustomerPhone, Receipt: result[0].Receipt, PaymentMethodIds: PaymentMethodIds, Total: this.ProductsToSellTotalPrice, BranchId: this.ProductsToSellTableRows[0].BranchId, ProductIds: ProductIds, UserId: 1, SalePaymentMethods: salePaymentMethods };
        this.normalSatisSerice.SellProducts(ProductSellingDto).toPromise().then(_ => this.InitlizeSelledProductsDatasource());
      }

    }));

  }

  productCodeFocusOut() {
    this.normalSatisSerice.GetProductDetails(this.ProductAndPriceFormGroup.controls.ProductFullCode.value).toPromise().then((res: ProductView) => {
      this.productView = res;
      this.ProductAndPriceFormGroup.controls.SellingPrice.setValue(this.productView.SellingPrice);
      this.productView.TempId = this.ProductsToSellTableId++;
    });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: "before",
        template: "calendar"
      },
      {
        location: "before",
        template: "calendar2"
      },
      // {
      //   location: "after",
      //   widget: "dxTextBox",
      //   options: {
      //     icon: "find",
      //     placeholder: this._translate.instant('SELLING_MODULE.NORMAL_SALE.SEARCH_IN_SALES'),
      //     onOptionChanged: (event) => {
      //       this.paymentDetailText = event.value;
      //       this.soledProductsDetailsText = event.value;
      //       // this.SoledProductsDatasource.filter(fi => fi.)
      //     }
      //   }

      // },
      {
        location: "before",
        widget: "dxButton",
        options: {
          icon: "find",
          onClick: () => {
            this.soledProductsGrid.searchPanel.text = "Hello"
            this.normalSatisSerice.GetSoledProductsByUserID(1, this.RangeStartDate.toISOString(), this.RangeEndDate.toISOString()).toPromise().then((res) => this.SoledProductsDatasource = res)
          }
        }
      },
    );
  }

  soledProductsDetailsFilterExpression(filterValue, selectedFilterOperation, target) {
    let column = this as any;
    // Implementation for the "between" comparison operator
    // console.log(column)
    // console.log(selectedFilterOperation)
    // console.log(filterValue)
    // console.log(target)
    // Invokes the default filtering behavior
    return column.defaultCalculateFilterExpression(arguments);
  }

}
