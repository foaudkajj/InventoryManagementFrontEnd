import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { ChangeProductDto } from 'app/InventoryApp/Models/DTOs/ChangeProductDto';
import { PaymentPopup } from 'app/InventoryApp/Models/DTOs/PaymentPopup';
import { ProductSellingDto } from 'app/InventoryApp/Models/DTOs/ProductSellingDTO';
import { ProductView } from 'app/InventoryApp/Models/DTOs/ProductView';
import { RefundProductsDto } from 'app/InventoryApp/Models/DTOs/RefundProductsDto';
import { SaleDetailsAndProductDto } from 'app/InventoryApp/Models/DTOs/SaleDetailsAndProductDto';
import { SalePaymentMethod } from 'app/InventoryApp/Models/DTOs/SalePaymentMethod';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { LoginResponse } from 'app/InventoryApp/Models/LoginResponse';
import { UIResponse } from 'app/InventoryApp/Models/UIResponse';
import { PaymentScreenComponent } from 'app/InventoryApp/Selling/PaymentScreen/payment-screen.component';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { NormalSatisService } from 'app/InventoryApp/services/normal-satis.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoGridComponent } from 'devextreme-angular/ui/nested';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-component',
  templateUrl: './change-refund-component.html',
  styleUrls: ['./change-refund-component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeRefundComponentComponent implements OnInit {
  customersSelectBoxDatasource: DataSource;
  purchasedProductsStore: CustomStore;
  customerInfoId = 0;
  @ViewChild('PriceInput') PriceInput: ElementRef;
  @ViewChild('productCode') productCode: ElementRef;
  // @ViewChild('purchasedProductsDetailsGrid') purchasedProductsDetailsGrid: DxDataGridComponent;
  // @ViewChild('purchasedProducts') purchasedProducts: DxDataGridComponent;
  @ViewChild('productsToChangeWith') productsToChangeWith: DxDataGridComponent;
  ProductAndPriceFormGroup: FormGroup;
  productView: ProductView;
  ProductsToSellTableId: number = 0;
  ProductsToSellDataSource: ProductView[] = [];
  ProductsToSellTableRows: ProductView[] = [];
  Genders: any = [{ Value: 0, ViewValue: 'Erkek' }, { Value: 1, ViewValue: 'Kadın' }]
  Operations: any = [{ Id: 0, Value: 'Satıldı' }, { Id: 1, Value: 'İade Edildi' }, { Id: 2, Value: 'Başka bir ürünle değiştirild' }]
  selectedRows: number[];
  SumOfProductsToReturn: number = 0;
  SumOfProductsToBeTakenInstead: number = 0;
  Math = Math;
  private unsubscribe: Subscription[] = [];
  ProductsToSellTotalPrice: number;
  userDetails = JSON.parse(localStorage.getItem('user')) as LoginResponse;
  saleDetailsAndProductDtos: SaleDetailsAndProductDto[] = [];
  constructor(public _translate: TranslateService,
    private dxStore: DxStoreService,
    private normalSatisSerice: NormalSatisService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initlizeCustomersSelectBox();
    this.getCustomerPurchasedProducts();
    this.InitilizeProductAndPriceForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
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

  getCustomerPurchasedProducts() {
    let storeOptions: DxStoreOptions = {
      loadUrl: "NormalSatis/GetCustomerPurchasedProducts", loadParams: { CustomerInfoId: this.customerInfoId }
    };
    this.purchasedProductsStore = this.dxStore.GetStore(storeOptions);
  }

  InitilizeProductAndPriceForm() {
    this.ProductAndPriceFormGroup = this.fb.group({
      ProductBarcode: ['', Validators.compose([
        Validators.required
      ])
      ],
      SellingPrice: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  onCustomerInfoValueChanged(e) {
    const previousValue = e.previousValue;
    const newValue = e.value;
    this.customerInfoId = newValue;
    this.SumOfProductsToReturn = 0;
    this.saleDetailsAndProductDtos = [];
    this.getCustomerPurchasedProducts();
  }

  isProductExist = false;
  lowProductCount = false;
  isProductCountEnough = false;
  async productCodeFocusOut() {
    this.PriceInput.nativeElement.focus();
    const productCode = this.ProductAndPriceFormGroup.controls.ProductBarcode.value;
    if (productCode && productCode.length == 12) {
      let res: UIResponse<ProductView> = await this.normalSatisSerice.GetProductDetails(productCode).toPromise();
      if (!res.IsError) {
        this.isProductExist = true;
        this.productView = res.Entity;
        this.ProductAndPriceFormGroup.controls.SellingPrice.setValue(this.productView.SellingPrice);
        this.productView.TempId = this.ProductsToSellTableId++;

        let ProductCount = this.ProductsToSellDataSource.filter(fi => fi.Id == this.productView.Id).length;
        this.productView.Count -= ProductCount;
        if (this.productView.Count <= 10) {
          this.lowProductCount = true;
        } else {
          this.lowProductCount = false;
        }

        if (this.productView.Count == 0) {
          this.isProductCountEnough = false;
        } else {
          this.isProductCountEnough = true;
        }

      } else {
        this.isProductExist = false;
        this.ProductAndPriceFormGroup.controls.SellingPrice.setValue(0);
      }
    }

  }

  focusOutWhenProductCodeEntered(value: string) {
    if (value.length == 12) {
      this.PriceInput.nativeElement.focus();
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ProductAndPriceFormGroup.controls[controlName].hasError(errorName);
  }

  AddProduct() {
    this.productView.SellingPrice = this.ProductAndPriceFormGroup.controls.SellingPrice.value;
    this.ProductsToSellTableRows.push(this.productView);
    this.AssingDataToProductsToSellTable();
    this.ProductAndPriceFormGroup.reset();
    this.lowProductCount = false;
    this.SumOfProductsToBeTakenInstead += this.productView.SellingPrice;
  }

  AssingDataToProductsToSellTable() {
    this.ProductsToSellDataSource = this.ProductsToSellTableRows;
  }

  DeleteFromProductsToSellTable(row: ProductView) {
    this.SumOfProductsToBeTakenInstead -= this.ProductsToSellTableRows.filter(fi => fi.TempId == row.TempId)[0].SellingPrice;
    this.ProductsToSellTableRows = this.ProductsToSellTableRows.filter(fi => fi.TempId != row.TempId);
    this.AssingDataToProductsToSellTable();
  }


  AddToReturn(data, saleDetails) {
    if (data?.AddedToRefunList) {
      this.saleDetailsAndProductDtos = this.saleDetailsAndProductDtos.filter(fi => fi.ProductId != data.ProductId && fi.SaleId != data.SaleId);
      this.SumOfProductsToReturn -= data.Price;
      data.AddedToRefunList = false;
    } else {
      this.saleDetailsAndProductDtos.push(data);
      this.SumOfProductsToReturn += data.Price;
      data.AddedToRefunList = true;
    }

  }

  async openSatisDialog(purchasedProcutsGridInstance: DxDataGridComponent) {
    this.ProductsToSellTotalPrice = (this.SumOfProductsToBeTakenInstead - this.SumOfProductsToReturn);

    if (this.ProductsToSellDataSource.length == 0) {
      await this.normalSatisSerice.RefundProducts(this.saleDetailsAndProductDtos).toPromise();
      purchasedProcutsGridInstance.instance.refresh();
      this.resetScreen();


    } else if (this.ProductsToSellTotalPrice > 0) {

      const dialogRef = this.dialog.open(PaymentScreenComponent, {
        height: '600px',
        width: '800px',
        data: { Total: this.ProductsToSellTotalPrice, CustomerInfoId: this.customerInfoId }
      });

      this.unsubscribe.push(dialogRef.afterClosed().subscribe(async (result: PaymentPopup[]) => {
        if (result?.length > 0) {
          console.log(result)
          let PaymentMethodIds: number[] = result.map(value => value.PaymentMethodId);
          let ProductIds: number[] = this.ProductsToSellTableRows.map(value => value.Id);
          let SellincPrices: number[] = this.ProductsToSellTableRows.map(value => value.SellingPrice);
          let salePaymentMethods: SalePaymentMethod[] = result.map(value => <SalePaymentMethod>{ Amount: value.Amount, DefferedPaymentCount: value.DefferedPaymentCount, PaymentMethodId: value.PaymentMethodId });
          let ProductSellingDTO: ProductSellingDto = { ProductIdsAndPrices: { SellingPrices: SellincPrices, ProductIds: ProductIds }, CustomerInfoId: result[0].CustomerInfo.Id, CustomerName: result[0].CustomerInfo.CustomerName, CustomerPhone: result[0].CustomerInfo.CustomerPhone, Receipt: result[0].Receipt, PaymentMethodIds: PaymentMethodIds, Total: this.ProductsToSellTotalPrice, BranchId: this.ProductsToSellTableRows[0].BranchId, UserId: this.userDetails.userId, SalePaymentMethods: salePaymentMethods };
          let changeProductDto: ChangeProductDto = { productsToChangeWith: ProductSellingDTO, purchasedProductsToChange: this.saleDetailsAndProductDtos }
          await this.normalSatisSerice.ChangeProducts(changeProductDto).toPromise();
          purchasedProcutsGridInstance.instance.refresh();
          this.resetScreen();
        }

      }));

    } else {
      let PaymentMethodIds: number[] = [];
      let ProductIds: number[] = this.ProductsToSellTableRows.map(value => value.Id);
      let SellincPrices: number[] = this.ProductsToSellTableRows.map(value => value.SellingPrice);
      let salePaymentMethods: SalePaymentMethod[] = [];
      let ProductSellingDTO: ProductSellingDto = { ProductIdsAndPrices: { SellingPrices: SellincPrices, ProductIds: ProductIds }, CustomerInfoId: this.customerInfoId, CustomerName: '', CustomerPhone: '', Receipt: '', PaymentMethodIds: PaymentMethodIds, Total: this.ProductsToSellTotalPrice, BranchId: this.ProductsToSellTableRows[0].BranchId, UserId: this.userDetails.userId, SalePaymentMethods: salePaymentMethods };
      let changeProductDto: ChangeProductDto = { productsToChangeWith: ProductSellingDTO, purchasedProductsToChange: this.saleDetailsAndProductDtos }
      await this.normalSatisSerice.ChangeProducts(changeProductDto).toPromise();
      purchasedProcutsGridInstance.instance.refresh();
      this.resetScreen();
    }


  }

  resetScreen() {
    this.SumOfProductsToReturn = 0;
    this.SumOfProductsToBeTakenInstead = 0;
    this.ProductsToSellTableRows = [];
    this.ProductsToSellDataSource = [];
    this.saleDetailsAndProductDtos = [];
  }

}
