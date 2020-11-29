import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { PaymentPopup } from 'app/InventoryApp/Models/DTOs/PaymentPopup';
import { ProductSellingDto } from 'app/InventoryApp/Models/DTOs/ProductSellingDTO';
import { ProductView } from 'app/InventoryApp/Models/DTOs/ProductView';
import { SalePaymentMethod } from 'app/InventoryApp/Models/DTOs/SalePaymentMethod';
import { SaleUserBranchProductsDTO } from 'app/InventoryApp/Models/DTOs/SaleUserBranchProductsDTO';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { LoginResponse } from 'app/InventoryApp/Models/LoginResponse';
import { UIResponse } from 'app/InventoryApp/Models/UIResponse';
import { PaymentScreenComponent } from 'app/InventoryApp/Selling/PaymentScreen/payment-screen.component';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { NormalSatisService } from 'app/InventoryApp/services/normal-satis.service';
import { SwalService } from 'app/InventoryApp/services/Swal.Service';
import { DxDataGridComponent, DxLookupComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-component',
  templateUrl: './sales-component.component.html',
  styleUrls: ['./sales-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SalesComponentComponent implements OnInit {

  RangeStartDate: Date;
  RangeEndDate: Date;
  Genders: any = [{ Value: 0, ViewValue: 'Erkek' }, { Value: 1, ViewValue: 'Kadın' }]
  // Here I used Material Table
  ProductsToSellDisplayedColumns = ['ProductName', 'ProductBarcode', 'ProductCode', 'ColorName', 'Gender', 'ProductYear', 'SellingPrice', 'Size', 'BranchName', 'actions'];
  ProductsToSellDataSource: ProductView[] = [];
  ProductsToSellTableRows: ProductView[] = [];
  @ViewChild("soledProductsGrid") soledProductsGrid: DxDataGridComponent;
  @ViewChild("customerInfoLookup") customerInfoLookup: DxLookupComponent;
  paymentDetailText: string;
  // soledProductsDetailsText: DxDataGridComponent;

  ProductsToSellTotalPrice: number;

  // Here I am using DevExtreme
  displayedColumnsSelledProducts = ['ProductName', 'ProductBarcode', 'ProductCode', 'ColorName', 'Gender', 'ProductYear', 'SellingPrice', 'Size', 'BranchName'];
  SoledProductsDatasource: SaleUserBranchProductsDTO[];
  soledProductsStore: CustomStore;
  // I am using this to unsubscribe after leaving component
  private unsubscribe: Subscription[] = [];



  ProductAndPriceFormGroup: FormGroup;

  ProductsToSellTableId: number = 0;
  ProductSellingDto: ProductSellingDto;
  @ViewChild('PriceInput') PriceInput: ElementRef;
  @ViewChild('productCode') productCode: ElementRef;
  filterByToday: Array<any>;
  today: Date = new Date();
  userDetails = JSON.parse(localStorage.getItem('user')) as LoginResponse;



  constructor(public _translate: TranslateService,
    private normalSatisSerice: NormalSatisService,
    private swal: SwalService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dxStore: DxStoreService) {

    this.InitlizeSelledProductsDatasource();
    this.InitilizeProductAndPriceForm();


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
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

  public hasError = (controlName: string, errorName: string) => {
    return this.ProductAndPriceFormGroup.controls[controlName].hasError(errorName);
  }

  InitlizeSelledProductsDatasource() {

    let storeOptions: DxStoreOptions = {
      loadUrl: "NormalSatis/GetSelledProductsByUserId", loadParams: { Id: this.userDetails.userId }, Key: "Id"
    };
    this.soledProductsStore = this.dxStore.GetStore(storeOptions);
    // this.normalSatisSerice.GetSoledProductsByUserID(1).toPromise().then((res: UIResponse<SaleUserBranchProductsDTO[]>) => {
    //   this.SoledProductsDatasource = res.Entity;
    //   this.ProductsToSellTableRows = [];
    // });
  }

  productView: ProductView;
  AddProduct() {
    this.productView.SellingPrice = this.ProductAndPriceFormGroup.controls.SellingPrice.value;
    this.ProductsToSellTableRows.push(this.productView);
    this.AssingDataToProductsToSellTable();
    this.ProductAndPriceFormGroup.reset();
    this.lowProductCount = false;
    this.hasCampaign = false;
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
      data: { Total: this.ProductsToSellTotalPrice = this.ProductsToSellDataSource.map(t => t.SellingPrice).reduce((acc, value) => +acc + +value, 0), CustomerInfoId: 0 }
    });

    this.unsubscribe.push(dialogRef.afterClosed().subscribe(async (result: PaymentPopup[]) => {
      if (result?.length > 0) {
        this.ProductsToSellDataSource = [];
        let PaymentMethodIds: number[] = result.map(value => value.PaymentMethodId);
        let ProductIds: number[] = this.ProductsToSellTableRows.map(value => value.Id);
        let SellincPrices: number[] = this.ProductsToSellTableRows.map(value => value.SellingPrice);
        let CampaignIds: number[] = this.ProductsToSellTableRows.map(value => value.CampaingId);
        let salePaymentMethods: SalePaymentMethod[] = result.map(value => <SalePaymentMethod>{ Amount: value.Amount, DefferedPaymentCount: value.DefferedPaymentCount, PaymentMethodId: value.PaymentMethodId });
        let ProductSellingDto: ProductSellingDto = { ProductIdsAndPricesAndCampaignIds: { SellingPrices: SellincPrices, ProductIds: ProductIds, CampaignIds: CampaignIds }, CustomerInfoId: result[0].CustomerInfo.Id, CustomerName: result[0].CustomerInfo.CustomerName, CustomerPhone: result[0].CustomerInfo.CustomerPhone, Receipt: result[0].Receipt, PaymentMethodIds: PaymentMethodIds, Total: this.ProductsToSellTotalPrice, BranchId: this.ProductsToSellTableRows[0].BranchId, UserId: this.userDetails.userId, SalePaymentMethods: salePaymentMethods };
        await this.normalSatisSerice.SellProducts(ProductSellingDto).toPromise();
        this.ProductsToSellTableRows = [];
        this.soledProductsGrid.instance.refresh();
      }

    }));

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

        if (this.productView.CampaingId != 0) {
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

  // onToolbarPreparing(e) {
  //   e.toolbarOptions.items.unshift(
  //     {
  //       location: "before",
  //       template: "calendar"
  //     },
  //     {
  //       location: "before",
  //       template: "calendar2"
  //     },
  //     {
  //       location: "before",
  //       widget: "dxButton",
  //       options: {
  //         icon: "find",
  //         onClick: () => {
  //           this.soledProductsGrid.searchPanel.text = "Hello"
  //           this.normalSatisSerice.GetSoledProductsByUserID(1, this.RangeStartDate.toISOString(), this.RangeEndDate.toISOString()).toPromise().then((res: UIResponse<any>) => this.SoledProductsDatasource = res.Entity)
  //         }
  //       }
  //     },
  //   );
  // }

  focusOutWhenProductCodeEntered(value: string) {
    if (value.length == 12) {
      this.PriceInput.nativeElement.focus();
    }
  }

  ngAfterViewInit() {
    this.productCode.nativeElement.focus();
  }

}
