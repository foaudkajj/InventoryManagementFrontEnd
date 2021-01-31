import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { ChangeProductDto } from 'app/InventoryApp/Models/DTOs/ChangeProductDto';
import { NewProductListToTakeDto } from 'app/InventoryApp/Models/DTOs/NewProductListToTakeDto';
import { PaymentDetailsDto } from 'app/InventoryApp/Models/DTOs/PaymentDetailsDto';
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
  selectedCustomerInfoId = 0;
  @ViewChild('PriceInput') PriceInput: ElementRef;
  @ViewChild('productCode') productCode: ElementRef;
  // @ViewChild('purchasedProductsDetailsGrid') purchasedProductsDetailsGrid: DxDataGridComponent;
  // @ViewChild('purchasedProducts') purchasedProducts: DxDataGridComponent;
  @ViewChild('productsToChangeWith') productsToChangeWith: DxDataGridComponent;
  ProductAndPriceFormGroup: FormGroup;
  newAddedProductToTake: ProductView;
  ProductsToSellTableId: number = 0;
  ProductsToSellDataSource: ProductView[] = [];
  ProductsToSellTableRows: ProductView[] = [];
  Genders: any = [{ Value: 0, ViewValue: 'Erkek' }, { Value: 1, ViewValue: 'Kadın' }]
  Operations: any = [{ Id: 0, Value: 'Satıldı' }, { Id: 1, Value: 'İade Edildi' }, { Id: 2, Value: 'Başka bir ürünle değiştirild' }, , { Id: 3, Value: 'Değiştirlen bir ürünün yerine bu alındı' }]
  selectedRows: number[];
  SumOfProductsToReturn: number = 0;
  SumOfProductsToBeTakenInstead: number = 0;
  Math = Math;
  private unsubscribe: Subscription[] = [];
  ProductsToSellTotalPrice: number;
  userDetails = JSON.parse(localStorage.getItem('user')) as LoginResponse;
  saleDetailsAndProductOfPreviouslyTakenProducts: SaleDetailsAndProductDto[] = [];
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
      loadUrl: "NormalSatis/GetCustomerPurchasedProducts", loadParams: { CustomerInfoId: this.selectedCustomerInfoId }
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
    this.selectedCustomerInfoId = newValue;
    this.SumOfProductsToReturn = 0;
    this.saleDetailsAndProductOfPreviouslyTakenProducts = [];
    this.getCustomerPurchasedProducts();
  }

  isProductExist = false;
  lowProductCount = false;
  hasCampaign = false;
  isProductCountEnough = false;
  async productCodeFocusOut() {
    this.PriceInput.nativeElement.focus();
    const productCode = this.ProductAndPriceFormGroup.controls.ProductBarcode.value;
    if (productCode && productCode.length == 12) {
      let res: UIResponse<ProductView> = await this.normalSatisSerice.GetProductDetails(productCode).toPromise();
      if (!res.IsError) {
        this.isProductExist = true;
        this.newAddedProductToTake = res.Entity;
        this.ProductAndPriceFormGroup.controls.SellingPrice.setValue(this.newAddedProductToTake.SellingPrice);
        this.newAddedProductToTake.TempId = this.ProductsToSellTableId++;

        let ProductCount = this.ProductsToSellDataSource.filter(fi => fi.Id == this.newAddedProductToTake.Id).length;
        this.newAddedProductToTake.Count -= ProductCount;
        if (this.newAddedProductToTake.Count <= 10) {
          this.lowProductCount = true;
        } else {
          this.lowProductCount = false;
        }

        if (this.newAddedProductToTake.Count == 0) {
          this.isProductCountEnough = false;
        } else {
          this.isProductCountEnough = true;
        }

        if (this.newAddedProductToTake.CampaingId != 0) {
          this.hasCampaign = true;
        } else {
          this.hasCampaign = false;
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
    this.newAddedProductToTake.SellingPrice = this.ProductAndPriceFormGroup.controls.SellingPrice.value;
    this.ProductsToSellTableRows.push(this.newAddedProductToTake);
    this.AssingDataToProductsToSellTable();
    this.ProductAndPriceFormGroup.reset();
    this.lowProductCount = false;
    this.hasCampaign = false;
    this.SumOfProductsToBeTakenInstead += this.newAddedProductToTake.SellingPrice;
  }

  AssingDataToProductsToSellTable() {
    this.ProductsToSellDataSource = this.ProductsToSellTableRows;
  }

  DeleteFromProductsToSellTable(row: ProductView) {
    this.SumOfProductsToBeTakenInstead -= this.ProductsToSellTableRows.filter(fi => fi.TempId == row.TempId)[0].SellingPrice;
    this.ProductsToSellTableRows = this.ProductsToSellTableRows.filter(fi => fi.TempId != row.TempId);
    this.AssingDataToProductsToSellTable();
  }



  AddToReturn(data) {
    if (data?.AddedToRefunList) {
      this.saleDetailsAndProductOfPreviouslyTakenProducts = this.saleDetailsAndProductOfPreviouslyTakenProducts.filter(fi => fi.ProductId != data.ProductId && fi.SaleId != data.SaleId);
      this.SumOfProductsToReturn -= data.Price;
      data.AddedToRefunList = false;
    } else {
      this.saleDetailsAndProductOfPreviouslyTakenProducts.push(data);
      this.SumOfProductsToReturn += data.Price;
      data.AddedToRefunList = true;
    }

  }

  async openSatisDialog(purchasedProcutsGridInstance: DxDataGridComponent) {
    this.ProductsToSellTotalPrice = (this.SumOfProductsToBeTakenInstead - this.SumOfProductsToReturn);

    let ProductIdListONewProducts: number[] = this.ProductsToSellTableRows.map(value => value.Id);
    let ProductIdListOfPreviouslyTakenProducts = this.saleDetailsAndProductOfPreviouslyTakenProducts.map(value => value.ProductId);
    let SaleIdOfOldProdcuts = this.saleDetailsAndProductOfPreviouslyTakenProducts[0].SaleId;
    if (this.ProductsToSellDataSource.length == 0) {
      let refundProductsDto: RefundProductsDto = { CustomerInfoId: this.selectedCustomerInfoId, Total: this.ProductsToSellTotalPrice, ProductIdListOfPreviouslyTakenProducts: ProductIdListOfPreviouslyTakenProducts, SaleIdOfOldProdcuts: SaleIdOfOldProdcuts }
      await this.normalSatisSerice.RefundProducts(refundProductsDto).toPromise();
      purchasedProcutsGridInstance.instance.refresh();
      this.resetScreen();


    } else if (this.ProductsToSellTotalPrice > 0) {

      const dialogRef = this.dialog.open(PaymentScreenComponent, {
        height: '600px',
        width: '800px',
        data: { Total: this.ProductsToSellTotalPrice, CustomerInfoId: this.selectedCustomerInfoId }
      });

      this.unsubscribe.push(dialogRef.afterClosed().subscribe(async (result: PaymentPopup[]) => {
        if (result?.length > 0) {
          console.log(result)
          let PaymentDetails: PaymentDetailsDto[] = result.map(paymentPopupResult => {
            let paymentDetails: PaymentDetailsDto = {
              PaymentId: paymentPopupResult.PaymentMethodId,
              amount: paymentPopupResult.Amount,
              defferedPaymentCount: paymentPopupResult.DefferedPaymentCount,
              receipt: paymentPopupResult.Receipt
            }
            return paymentDetails;
          });

          let PriceListOfNewProducts: number[] = this.ProductsToSellTableRows.map(value => value.SellingPrice);
          let newProductListToTake: NewProductListToTakeDto = { ProductIdList: ProductIdListONewProducts, ProductPrices: PriceListOfNewProducts };

          let changeProductDto: ChangeProductDto = { newProductListToTake: newProductListToTake, paymentDetails: PaymentDetails, customerInfoDto: { Id: result[0].CustomerInfo.Id, CustomerName: result[0].CustomerInfo.CustomerName, CustomerPhone: result[0].CustomerInfo.CustomerPhone }, ProductIdListOfPreviouslyTakenProducts: ProductIdListOfPreviouslyTakenProducts, SaleIdOfOldProdcuts: SaleIdOfOldProdcuts, Total: this.ProductsToSellTotalPrice }
          await this.normalSatisSerice.ChangeProducts(changeProductDto).toPromise();
          purchasedProcutsGridInstance.instance.refresh();
          this.resetScreen();
        }

      }));

    } else {

      let PriceListOfNewProducts: number[] = this.ProductsToSellTableRows.map(value => value.SellingPrice);
      let newProductListToTake: NewProductListToTakeDto = { ProductIdList: ProductIdListONewProducts, ProductPrices: PriceListOfNewProducts };

      let changeProductDto: ChangeProductDto = { paymentDetails: [{ PaymentId: 12, amount: 0, defferedPaymentCount: 0, receipt: '' }], customerInfoDto: { Id: this.selectedCustomerInfoId }, SaleIdOfOldProdcuts: SaleIdOfOldProdcuts, Total: this.ProductsToSellTotalPrice, newProductListToTake: newProductListToTake, ProductIdListOfPreviouslyTakenProducts: ProductIdListOfPreviouslyTakenProducts }
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
    this.saleDetailsAndProductOfPreviouslyTakenProducts = [];
  }

  purchasedProductsDetailsGridSelectionChanged(e) {
    e.currentSelectedRowKeys.forEach(firstLevel => {
      firstLevel.SaleDetailsAndProducts.forEach(saleDetailsAndProducts => {
        saleDetailsAndProducts.AddedToRefunList = false;
      });

    });
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
    this.resetScreen();
  }

}
