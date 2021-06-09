import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDto } from 'app/InventoryApp/Models/ProductDto';
import { map } from 'rxjs/operators';
import { from, timer } from 'rxjs';
import { ProductView } from 'app/InventoryApp/Models/DTOs/ProductView';
import { Color } from 'app/InventoryApp/Models/Color';
import { Branch } from 'app/InventoryApp/Models/Branch';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorsService } from 'app/InventoryApp/services/Colors.service';
import { ProductService } from 'app/InventoryApp/services/products.service';
import { Barcode } from 'app/InventoryApp/Models/DTOs/Barcode';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { UIResponse } from 'app/InventoryApp/Models/UIResponse';
import { AddProductsDto } from 'app/InventoryApp/Models/DTOs/AddProductsDto';
import { SwalService } from 'app/InventoryApp/services/Swal.Service';
import swal from "sweetalert2";
import { ProductTypeService } from 'app/InventoryApp/services/product-type.service';
import { ProductTypeDto } from 'app/InventoryApp/Models/ProductType';
import { LoadResult } from 'app/InventoryApp/Models/DTOs/LoadResult';
import { ProductPropertyDto } from 'app/InventoryApp/Models/ProductPropertyDto';
import { FormConf } from 'app/InventoryApp/Models/DTOs/FormConf';
import { Column } from 'devextreme/ui/data_grid';
import { dxFormButtonItem, dxFormEmptyItem, dxFormGroupItem, dxFormSimpleItem, dxFormTabbedItem } from 'devextreme/ui/form';
import { LoadOptions } from 'devextreme/data/load_options';
import dxButton from 'devextreme/ui/button';
import { MatDialog } from '@angular/material/dialog';
import { CampaignApplyingScreenComponent } from './components/campaignApplying/campaign-applying-screen.component';
import { ApplyCampaignRequestDto } from 'app/InventoryApp/Models/DTOs/ApplyCampaignRequestDto';
import { CampaignService } from 'app/InventoryApp/services/campaign-service';
import { CampaignDto } from 'app/InventoryApp/Models/CampaignDto';
import { ReportUrls } from 'app/InventoryApp/Enums/ReportUrls';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  @ViewChild('productsGrid') productsGrid: DxDataGridComponent
  ProductForm: FormGroup;
  colorsList: Color[];
  branchesList: Branch[];
  campaignList: CampaignDto[];
  Genders: any = [{ Value: 0, ViewValue: 'Erkek' }, { Value: 1, ViewValue: 'Kadın' }]
  dataSource: DataSource; //MatTableDataSource<ProductView> = new MatTableDataSource();
  store: CustomStore;
  selectedProducts: any[] = [];
  ProductTypes: ProductTypeDto[] = [{ Id: 0, Name: this._translate.instant("STOCK_MODULE.PRODUCT_MANAGEMENT.ALL"), ProductPropertyIds: [], ProductProperties: [], Products: [], ProductTypeAndProperties: [] }];
  FormItems: Array<dxFormSimpleItem | dxFormGroupItem | dxFormTabbedItem | dxFormEmptyItem | dxFormButtonItem> = [];
  ProductGridColumns: Column[] = [];
  @ViewChild('formInstance') formInstance: DxFormComponent;
  SelectedProductType: ProductTypeDto;
  applyCampaignBtnInstance: dxButton;
  constructor(private fb: FormBuilder,
    private colorService: ColorsService,
    private productService: ProductService,
    private branchesService: BranchesService,
    private campaignService: CampaignService,
    public _translate: TranslateService,
    private router: Router,
    private dxStore: DxStoreService,
    private swal: SwalService,
    private productTypeService: ProductTypeService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.initProductTypes();
    // this.initLoginForm();
    await this.getColors();
    await this.getBranches();
    await this.getCampaigns();
    this.filTable();
  }
  async initProductTypes() {
    return this.ProductTypes = this.ProductTypes.concat(((await this.productTypeService.GetList().toPromise()) as LoadResult<ProductTypeDto>)?.data)
  }

  filTable() {
    this.AddDefaultProductGridColumns();
    let storeOption: DxStoreOptions = {
      loadUrl: "Products", insertUrl: "Products", updateUrl: "Products", deleteUrl: "Products", Key: "Id",
      onInserted: (values: UIResponse<AddProductsDto>, key) => {
        // this.ProductForm.reset();
        if (values.IsError) {
          let html = this._translate.instant(values.Message) as string;
          values.Entity.ExistedProducts.forEach(fe => {
            console.log(fe)
            html = html.concat(`<br/> ${fe.ProductName} | ${fe.ProductCode} | ${fe.ProductBarcode} | ${fe.Size}`)
          });
          this.swal.showErrorMessage(html);
        } else {
          this.productsGrid.instance.refresh();
          this.swal.showSuccessMessage()
        }
      },
      onRemoved: () => this.productsGrid.instance.refresh(),
      onUpdated: () => this.productsGrid.instance.refresh(),
    };
    this.store = this.dxStore.GetStore(storeOption);

    this.dataSource = new DataSource({
      store: this.store,
      filter: ["Count", ">", "0"]
    });

  }
  getBranches() {
    return this.branchesService.GetBranches().toPromise().then(res => this.branchesList = (res.data as Branch[]))
  }

  getCampaigns() {
    return this.campaignService.GetCampaigns().toPromise().then(res => this.campaignList = (res.data as CampaignDto[]))
  }
  getColors() {
    return this.colorService.GetColors().toPromise().then(res => this.colorsList = (res.data as Color[]));
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.ProductForm.controls[controlName].hasError(errorName);
  }

  rows: ProductDto[] = [];
  AddRow() {
    if (this.formInstance.instance.validate().isValid) {
      const product: ProductDto[] = [{ ...this.formInstance.instance.option("formData"), ProductTypeId: this.SelectedProductType.Id }]
      this.store.insert(product);
    }


  }

  DeleteFromColorTB(row: ProductView) {
    this.store.remove(row.Id);
  }

  onToolbarPreparing(e) {
    var dataGridInstance = e.component;
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'printButton',
    },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          onInitialized: (args) => {
            this.applyCampaignBtnInstance = args.component;
          },
          text: this._translate.instant('STOCK_MODULE.PRODUCT_MANAGEMENT.APPLY_CAMPAIGN'),
          disabled: true,
          onClick: this.applyCampaign.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxCheckBox',
        options: {
          value: false,
          text: this._translate.instant('STOCK_MODULE.PRODUCT_MANAGEMENT.SHOW_OUT_OF_STOCK'),
          onValueChanged: (e) => {
            if (e.value) {
              dataGridInstance.clearFilter();
            } else {
              dataGridInstance.filter(["Count", ">", 0]);
            }
          }
        }
      });
  }

  async PrintButton(data) {
    let QueryParams = '';

    for (const selectedProduct of (this.productsGrid.instance.getSelectedRowsData() as ProductView[])) {
      QueryParams = QueryParams.concat(selectedProduct.ProductBarcode, ',')
    }

    let url = this.router.createUrlTree(['ReportViewer'], { queryParams: { ReportName: `${ReportUrls.ProductTicket}?ProductBarcode=${QueryParams.substring(0, QueryParams.length - 1)}` } })
    window.open('#' + url.toString(), '_blank')

  }


  timouted: false;
  async ShowProductTag(row: ProductView) {
    let url = this.router.createUrlTree(['ReportViewer'], { queryParams: { ReportName: `${ReportUrls.ProductTicket}?ProductBarcode=${row.ProductBarcode}` } })
    window.open('#' + url.toString(), '_blank')

  }

  increaseCountPopup(product: ProductView, operation: 'ADD' | 'REMOVE') {

    swal.fire({
      title: operation == 'ADD' ? this._translate.instant('STOCK_MODULE.PRODUCT_MANAGEMENT.PRODUCT_COUNT_ADD') : this._translate.instant('STOCK_MODULE.PRODUCT_MANAGEMENT.PRODUCT_COUNT_REMOVE'),
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: operation == 'ADD' ? this._translate.instant('STOCK_MODULE.PRODUCT_MANAGEMENT.ADD') : this._translate.instant('STOCK_MODULE.PRODUCT_MANAGEMENT.REMOVE'),
      showLoaderOnConfirm: true,
      preConfirm: (Count) => {
        return this.productService.IncreaseProductCount(product.Id, operation == 'ADD' ? Count : (Count * -1)).toPromise()
          .then((response: UIResponse<ProductView>) => {
            if (response.IsError) {
              throw new Error(response.Message);
            }
            this.productsGrid.instance.refresh();
            return response;
          })
          .catch(error => {
            this.swal.showErrorMessage(error.Message)
          })
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed)
        this.swal.showSuccessMessage();
    })
  }




  async ProductTypeChanged(value) {
    this.SelectedProductType = value;
    this.FormItems = [];
    this.ProductGridColumns = [];
    if (value.Id != 0) {
      value.ProductProperties.forEach(property => {

        this.ConfigureFormItems(property);
        this.ConfigureProductGridColumns(property);

      });
      this.AddDefaultFormItems();
      this.AddDefaultProductGridColumns();

      await this.productsGrid.instance.filter(["ProductTypeId", "=", value.Id]);
    }
    else {
      this.AddDefaultProductGridColumns();
      this.productsGrid?.instance.clearFilter();
    }
    this.productsGrid.instance.deselectAll();


  }

  ConfigureFormItems(property: ProductPropertyDto) {
    let editorOptions = property.FormItemEditorOptions ? JSON.parse(property.FormItemEditorOptions) : {};
    let ValidationRules = property.Validation ? JSON.parse(property.Validation) : {};
    if (property.EditorType == "dxSelectBox") {
      switch (property.DataField) {
        case "Gender":
          editorOptions.items = this.Genders;
          editorOptions.displayExpr = "ViewValue";
          editorOptions.valueExpr = "Value";
          editorOptions.searchEnabled = true;
          break;

        case "ColorId":
          editorOptions.items = this.colorsList;
          editorOptions.displayExpr = "ColorName";
          editorOptions.valueExpr = "Id";
          editorOptions.searchEnabled = true;
          break;

        default:
          break;
      }
    }
    this.FormItems.push({ dataField: property.DataField, editorType: property.EditorType, editorOptions: editorOptions, validationRules: ValidationRules, label: { text: this._translate.instant(property.Translate) } });
  }

  AddDefaultFormItems() {
    this.FormItems.push({
      itemType: "button", buttonOptions: {
        text: this._translate.instant('STOCK_MODULE.MASTER_DATA.ADD'),
        type: "default",
        useSubmitBehavior: true,
        onClick: () => this.AddRow()
      },
      horizontalAlignment: "left"
    });

    this.FormItems = [{ dataField: "ProductName", editorType: "dxTextBox", label: { text: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_NAME') }, validationRules: [{ type: "required" }] },
    { dataField: "Count", editorType: "dxNumberBox", label: { text: this._translate.instant("STOCK_MODULE.MASTER_DATA.COUNT") }, validationRules: [{ type: "required" }] },
    { dataField: "Price", editorType: "dxNumberBox", label: { text: this._translate.instant("STOCK_MODULE.MASTER_DATA.PRICE") }, editorOptions: { format: { type: 'currency', precision: 2 } }, validationRules: [{ type: "numeric", min: 0 }, { type: "required" }] },
    { dataField: "SellingPrice", editorType: "dxNumberBox", label: { text: this._translate.instant("STOCK_MODULE.MASTER_DATA.SELLING_PRICE") }, editorOptions: { format: { type: 'currency', precision: 2 } }, validationRules: [{ type: "numeric", min: 0 }, { type: "required" }] },
    { dataField: "ProductCode", editorType: "dxTextBox", label: { text: this._translate.instant("STOCK_MODULE.MASTER_DATA.PRODUCT_CODE") }, validationRules: [{ type: "required" }] },
    { dataField: "BranchId", editorType: "dxSelectBox", label: { text: this._translate.instant("STOCK_MODULE.MASTER_DATA.BRANCH_NAME") }, validationRules: [{ type: "required" }], editorOptions: { dataSource: this.branchesList, displayExpr: "Name", valueExpr: "Id" } },
    ... this.FormItems
    ]
  }

  ConfigureProductGridColumns(property: ProductPropertyDto) {
    let editorOptions = property.GridColumnEditorOptions ? JSON.parse(property.GridColumnEditorOptions) : {};
    let columnConf = property.GridColumnConf ? JSON.parse(property.GridColumnConf) : {};
    let ValidationRules = property.Validation ? JSON.parse(property.Validation) : undefined;

    if (property.EditorType == "dxSelectBox") {
      switch (property.DataField) {
        case "Gender":
          this.ProductGridColumns.push({
            dataField: property.DataField,
            editorOptions: editorOptions,
            validationRules: ValidationRules,
            caption: this._translate.instant(property.Translate),
            lookup: {
              dataSource: this.Genders,
              displayExpr: "ViewValue",
              valueExpr: "Value"
            }
          });
          return;

        case "ColorId":
          this.ProductGridColumns.push({
            dataField: property.DataField,
            editorOptions: editorOptions,
            validationRules: ValidationRules,
            caption: this._translate.instant(property.Translate),
            lookup: {
              dataSource: this.colorsList,
              displayExpr: "ColorName",
              valueExpr: "Id"
            }
          });
          return;

      }
    }
    this.ProductGridColumns.push({ dataField: property.DataField, editorOptions: editorOptions, validationRules: ValidationRules, caption: this._translate.instant(property.Translate), ...columnConf });
  }


  AddDefaultProductGridColumns() {
    this.ProductGridColumns = [
      { cellTemplate: 'cellTemplate', formItem: { visible: false }, allowEditing: false, allowSorting: false, allowFiltering: false },
      { dataField: "ProductName", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_NAME'), validationRules: [{ type: "required" }], allowHeaderFiltering: false },
      { dataField: "ProductBarcode", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_BARCODE'), allowHeaderFiltering: false },
      { dataField: "Count", caption: this._translate.instant("STOCK_MODULE.MASTER_DATA.COUNT"), validationRules: [{ type: "required" }], allowHeaderFiltering: false },
      { dataField: "Price", caption: this._translate.instant("STOCK_MODULE.MASTER_DATA.PRICE"), format: { type: 'currency', precision: 2 }, validationRules: [{ type: "numeric", min: 0 }, { type: "required" }], allowHeaderFiltering: false },
      { dataField: "SellingPrice", caption: this._translate.instant("STOCK_MODULE.MASTER_DATA.SELLING_PRICE"), format: { type: 'currency', precision: 2 }, validationRules: [{ type: "numeric", min: 0 }, { type: "required" }], allowHeaderFiltering: false },
      { dataField: "ProductCode", caption: this._translate.instant("STOCK_MODULE.MASTER_DATA.PRODUCT_CODE"), validationRules: [{ type: "required" }], allowHeaderFiltering: false },
      { dataField: "BranchId", caption: this._translate.instant("STOCK_MODULE.MASTER_DATA.BRANCH_NAME"), validationRules: [{ type: "required" }], lookup: { dataSource: this.branchesList, displayExpr: "Name", valueExpr: "Id" } },
      { dataField: "CampaignId", caption: this._translate.instant("STOCK_MODULE.MASTER_DATA.CAMPAIGNS"), validationRules: [{ type: "required" }], lookup: { dataSource: this.campaignList, displayExpr: "Name", valueExpr: "Id" } },
      ... this.ProductGridColumns
    ]
    this.ProductGridColumns.push({ cellTemplate: 'increaseCount', formItem: { visible: false }, allowEditing: false, allowSorting: false, allowFiltering: false });
  }

  onProductManagerGridSelectChanged(e) {
    this.applyCampaignBtnInstance.option("disabled", (this.selectedProducts.length == 0))
  }

  async applyCampaign(data) {
    const dialogRef = this.dialog.open(CampaignApplyingScreenComponent);

    await dialogRef.afterClosed().toPromise().then(async (CampaignId: number) => {
      if (CampaignId && CampaignId != 0) {
        let payload: ApplyCampaignRequestDto = { CampaignId: CampaignId, ProductsId: this.selectedProducts }
        await this.productService.ApplyCampaign(payload).toPromise();
        this.productsGrid.instance.deselectAll();
        this.productsGrid.instance.refresh();
      }
    })
  }

}
