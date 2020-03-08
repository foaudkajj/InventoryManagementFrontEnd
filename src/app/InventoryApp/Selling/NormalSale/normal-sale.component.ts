import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductView } from 'app/InventoryApp/Models/DTOs/ProductView';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductSellingDto } from 'app/InventoryApp/Models/DTOs/ProductSellingDTO';
import { MatDialog } from '@angular/material/dialog';
import { NormalSatisService } from 'app/InventoryApp/services/normal-satis.service';
import { PaymentMethodsTable } from 'app/InventoryApp/Models/DTOs/PaymentMethodsTable';
import { SalePaymentMethod } from 'app/InventoryApp/Models/DTOs/SalePaymentMethod';
import { Product } from 'app/InventoryApp/Models/Product';
import { DxDataGridComponent } from 'devextreme-angular';
import { PaymentScreenComponent } from '../PaymentScreen/payment-screen.component';

@Component({
  selector: 'app-normal-sale',
  templateUrl: './normal-sale.component.html',
  styleUrls: ['./normal-sale.component.scss']
})
export class NormalSaleComponent implements OnInit {
  RangeStartDate: Date;
  RangeEndDate: Date;

  // Here I used Material Table
  ProductsToSellDisplayedColumns = ['ProductName', 'ProductFullCode', 'ProductCode', 'ColorName', 'Gender', 'ProductYear', 'SellingPrice', 'Size', 'BranchName', 'actions'];
  ProductsToSellDataSource: any;
  ProductsToSellTableRows: ProductView[] = [];
  @ViewChild("soledProductsGrid") soledProductsGrid: DxDataGridComponent;
  ProductsToSellTotalPrice: number;

  // Here I am using DevExtreme
  displayedColumnsSelledProducts = ['ProductName', 'ProductFullCode', 'ProductCode', 'ColorName', 'Gender', 'ProductYear', 'SellingPrice', 'Size', 'BranchName'];
  SoledProductsDatasource: any[];

  // I am using this to unsubscribe after leaving component
  private unsubscribe: Subscription[] = [];



  ProductAndPriceFormGroup: FormGroup;

  ProductsToSellTableId: number = 0;
  ProductSellingDto: ProductSellingDto;
  constructor(public _translate: TranslateService,
    private normalSatisSerice: NormalSatisService,
    public dialog: MatDialog,
    private fb: FormBuilder, ) { }

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
    this.normalSatisSerice.GetSoledProductsByUserID(1).toPromise().then((res: Product[]) => {
      this.SoledProductsDatasource = res
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.ProductsToSellDataSource.filter = filterValue;
  }


  AddProduct() {
    this.normalSatisSerice.GetProductDetails(this.ProductAndPriceFormGroup.controls.ProductFullCode.value).toPromise().then((res: ProductView) => {
      let productView = res;
      productView.SellingPrice = this.ProductAndPriceFormGroup.controls.SellingPrice.value;
      productView.TempId = this.ProductsToSellTableId++;
      this.ProductsToSellTableRows.push(productView);
      this.AssingDataToProductsToSellTable();
      this.ProductAndPriceFormGroup.reset();
    });
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

    this.unsubscribe.push(dialogRef.afterClosed().subscribe((result: PaymentMethodsTable[]) => {
      if (result.length > 0) {
        let PaymentMethodIds: number[] = result.map(value => value.PaymentMethodId);
        let ProductIds: number[] = this.ProductsToSellTableRows.map(value => value.Id);
        let salePaymentMethods: SalePaymentMethod[] = result.map(value => <SalePaymentMethod>{ Amount: value.Amount, DefferedPaymentCount: value.DefferedPaymentCount, PaymentMethodId: value.PaymentMethodId });
        let ProductSellingDto: ProductSellingDto = { Receipt: result[0].Receipt, PaymentMethodIds: PaymentMethodIds, Total: this.ProductsToSellTotalPrice, BranchId: this.ProductsToSellTableRows[0].BranchId, ProductIds: ProductIds, UserId: 1, SalePaymentMethods: salePaymentMethods };
        console.log(ProductSellingDto)
        this.normalSatisSerice.SellProducts(ProductSellingDto).toPromise().then(_ => this.InitlizeSelledProductsDatasource());
      }

    }));

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
      {
        location: "before",
        widget: "dxButton",
        options: {
          icon: "find",
          onClick: () => {
            this.normalSatisSerice.GetSoledProductsByUserID(1, this.RangeStartDate.toISOString(), this.RangeEndDate.toISOString()).toPromise().then((res) => this.SoledProductsDatasource = res)
          }
        }
      },
    );
  }

}
