import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDto } from 'app/InventoryApp/Models/ProductDto';
import { map } from 'rxjs/operators';
import { from, timer } from 'rxjs';
import { ProductView } from 'app/InventoryApp/Models/DTOs/ProductView';
import html2canvas from 'html2canvas';
import { Color } from 'app/InventoryApp/Models/Color';
import { Branch } from 'app/InventoryApp/Models/Branch';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorsService } from 'app/InventoryApp/services/Colors.service';
import { ProductService } from 'app/InventoryApp/services/products.service';
import { Barcode } from 'app/InventoryApp/Models/DTOs/Barcode';
import jsPDF from 'jspdf';
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

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  @ViewChild('productsGrid') productsGrid: DxDataGridComponent
  BarcodeObject: Barcode = new Barcode();
  ProductForm: FormGroup;
  colorsList: Color[];
  branchesList: Branch[];
  Genders: any = [{ Value: 0, ViewValue: 'Erkek' }, { Value: 1, ViewValue: 'Kadın' }]
  displayedColumns = ['ProductName', 'ProductCode', 'ColorName', 'Gender', 'Price', 'SellingPrice', 'ProductYear', 'Size', 'BranchName', 'Count', 'ProductBarcode', 'actions'];
  dataSource: DataSource; //MatTableDataSource<ProductView> = new MatTableDataSource();
  store: CustomStore;
  selectedProducts: [] = [];
  ProductTypes: ProductTypeDto[] = [{ Id: 0, Name: this._translate.instant("STOCK_MODULE.PRODUCT_MANAGEMENT.ALL"), ProductPropertyIds: [], ProductProperties: [], Products: [], ProductTypeAndProperties: [] }];
  FormItems: Array<dxFormSimpleItem | dxFormGroupItem | dxFormTabbedItem | dxFormEmptyItem | dxFormButtonItem> = [];
  ProductGridColumns: Column[] = [];
  @ViewChild('formInstance') formInstance: DxFormComponent;
  SelectedProductType: ProductTypeDto;
  constructor(private fb: FormBuilder,
    private colorService: ColorsService,
    private productService: ProductService,
    private branchesService: BranchesService,
    public _translate: TranslateService,
    private router: Router,
    private dxStore: DxStoreService,
    private swal: SwalService,
    private productTypeService: ProductTypeService
  ) { }

  async ngOnInit() {
    await this.initProductTypes();
    this.initLoginForm();
    await this.getColors();
    await this.getBranches();
    this.filTable();
  }
  async initProductTypes() {
    return this.ProductTypes = this.ProductTypes.concat(((await this.productTypeService.GetList().toPromise()) as LoadResult<ProductTypeDto>)?.data)
  }

  filTable() {
    this.AddDefaultProductGridColumns();
    let storeOption: DxStoreOptions = {
      loadUrl: "Products", insertUrl: "Products", updateUrl: "Products", deleteUrl: "Products", Key: "Id",
      onLoaded: (result) => console.log("LOadedProduct"),
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

  }
  getBranches() {
    return this.branchesService.GetBranches().toPromise().then(res => this.branchesList = (res.data as Branch[]))
  }
  getColors() {
    return this.colorService.GetColors().toPromise().then(res => this.colorsList = (res.data as Color[]));
  }

  initLoginForm() {

    this.ProductForm = this.fb.group({
      ProductName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])
      ],
      ProductYear: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(4)
      ])],
      Color: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(4)
      ])],
      Gender: [Validators.compose([
        Validators.required,
        Validators.maxLength(4)
      ])],
      Size: ['', Validators.compose([
        Validators.required,
        Validators.max(99),
        Validators.min(0)
      ])],
      Price: ['', Validators.compose([
        Validators.required
      ])],
      SellingPrice: ['', Validators.compose([
        Validators.required
      ])],
      ProductCode: ['', Validators.compose([
        Validators.required,
      ])],
      Branch: ['', Validators.compose([
        Validators.required,
      ])],
      Count: ['', Validators.compose([
        Validators.required,
      ])]
    });
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

    // if (!this.ProductForm.invalid) {

    //   const product: ProductDto[] = [{
    //     ColorId: this.ProductForm.controls.Color.value,
    //     Gender: this.ProductForm.controls.Gender.value,
    //     Price: this.ProductForm.controls.Price.value,
    //     SellingPrice: this.ProductForm.controls.SellingPrice.value,
    //     ProductCode: this.ProductForm.controls.ProductCode.value,
    //     ProductBarcode: null,
    //     ProductName: this.ProductForm.controls.ProductName.value,
    //     ProductYear: this.ProductForm.controls.ProductYear.value,
    //     Size: this.ProductForm.controls.Size.value,
    //     BranchId: this.ProductForm.controls.Branch.value,
    //     Count: this.ProductForm.controls.Count.value
    //   }];
    //   product[0].ProductBarcode = this.GetProductBarcode(product[0]);

    //   this.store.insert(product);
    // }


  }
  GetProductBarcode(product: ProductDto) {
    let IsSizeWithFraction = (product.Size - Math.floor(product.Size)) !== 0;
    let Size = IsSizeWithFraction ? (product.Size + 20) : product.Size;
    return ((product.Gender ? 1 : 2).toString() + product.ProductYear.slice(product.ProductYear.length - 2) + Size.toString().slice(0, 2) + product.ColorId.toString().slice(product.ColorId.toString().length - 2, product.ColorId.toString().length).padStart(2, '0') + product.ProductCode);
  }

  Fill() {
    if (!this.ProductForm.invalid) {
      let product: ProductDto = {
        ColorId: this.ProductForm.controls.Color.value,
        Gender: this.ProductForm.controls.Gender.value,
        Price: this.ProductForm.controls.Price.value,
        SellingPrice: this.ProductForm.controls.SellingPrice.value,
        ProductCode: this.ProductForm.controls.ProductCode.value,
        ProductBarcode: null,
        ProductName: this.ProductForm.controls.ProductName.value,
        ProductYear: this.ProductForm.controls.ProductYear.value,
        Size: this.ProductForm.controls.Size.value,
        BranchId: this.ProductForm.controls.Branch.value,
        Count: this.ProductForm.controls.Count.value,
        ProductTypeId: this.SelectedProductType.Id
      };


      const products: ProductDto[] = [];
      // Gender 1 ise Kadin demektir
      if (product.Gender == true) {
        from([35, 36, 37, 38, 39, 40, 41]).subscribe(size => {
          product.Gender = true;
          product.Size = size;
          let fullCode = this.GetProductBarcode(product);
          products.push({
            ColorId: product.ColorId, Gender: product.Gender, Price: product.Price, ProductCode: product.ProductCode, ProductBarcode: fullCode, ProductName: product.ProductName, ProductYear: product.ProductYear, Size: size, BranchId: product.BranchId,
            Count: product.Count, SellingPrice: product.SellingPrice, ProductTypeId: this.SelectedProductType.Id
          });
        });
      } else {
        from([39, 40, 41, 42, 43, 44, 45, 46]).pipe(map(size => {
          product.Gender = false;
          product.Size = size;
          let fullCode = this.GetProductBarcode(product);
          products.push({
            ColorId: product.ColorId, Gender: product.Gender, Price: product.Price, ProductCode: product.ProductCode, ProductBarcode: fullCode, ProductName: product.ProductName, ProductYear: product.ProductYear, Size: size, BranchId: product.BranchId,
            Count: product.Count, SellingPrice: product.SellingPrice, ProductTypeId: this.SelectedProductType.Id
          });
        })).subscribe();
      }
      this.store.insert(products);
      // this.productService.AddProducts(shoes).toPromise().finally(() => { this.filTable(); this.ProductForm.reset(); });
    }
  }

  DeleteFromColorTB(row: ProductView) {
    this.store.remove(row.Id);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'printButton',
    });
  }

  async PrintButton() {
    let QueryParams = '';

    for (const selectedProduct of (this.productsGrid.instance.getSelectedRowsData() as ProductView[])) {
      QueryParams = QueryParams.concat(selectedProduct.ProductBarcode, ',')
      // if (selectedProduct.Count != 0)
      //   Array.from({ length: selectedProduct.Count }).map(m => QueryParams = QueryParams.concat(selectedProduct.ProductFullCode, ','));
      // else
      //   QueryParams = QueryParams.concat(selectedProduct.ProductFullCode, ',')

    }

    let url = this.router.createUrlTree(['ReportViewer'], { queryParams: { ProductBarcode: QueryParams.substring(0, QueryParams.length - 1) } })
    console.log(url.toString())
    window.open('#' + url.toString(), '_blank')

  }


  timouted: false;
  async ShowProductTag(row: ProductView) {
    // this.router.navigate(['ReportViewer'], {
    //   queryParams: { ProductFullCode: row.ProductFullCode }
    // });
    let url = this.router.createUrlTree(['ReportViewer'], { queryParams: { ProductBarcode: row.ProductBarcode } })
    console.log(url.toString())
    window.open('#' + url.toString(), '_blank')
    // this.BarcodeObject.BarcodeValue = row.ProductFullCode;
    // console.log(row)
    // this.BarcodeObject.Color = row.Color.ColorName;
    // this.BarcodeObject.Size = row.Size;
    // this.BarcodeObject.Price = row.Price;
    // this.BarcodeObject.Date = Date.now().toString();

    // await timer(1000).toPromise()
    // await this.downloadAsPDF();

  }

  editRow(data) {
    this.productsGrid.instance.editRow(data.rowIndex);
  }

  downloadAsPDF() {
    // console.log(document.getElementById("pdfTable"))
    return html2canvas(document.getElementById("pdfTable"), {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById('pdfTable').style.visibility = 'visible';
      }
    }).then(canvas => {
      var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
      var imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, 0, 0, (canvas.width), (canvas.height));

      var blob = new Blob([pdf.output('blob')], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob), Math.random().toString(), "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes");
      // console.log(url)
      // pdf.save('converteddoc.pdf');

    }).finally(() => { });
  }

  getGendere(gender: number) {
    // 0 means Erkek, 1 means Kadin
    return gender ? "Kadın" : "Erkek"
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




  async ProductTypeChanged(value: ProductTypeDto) {
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


  }

  ConfigureFormItems(property: ProductPropertyDto) {
    let editorOptions = property.FormItemEditorOptions ? JSON.parse(property.FormItemEditorOptions) : {};
    let ValidationRules = property.Validation ? JSON.parse(property.Validation) : undefined;
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
    { dataField: "BranchId", editorType: "dxLookup", label: { text: this._translate.instant("STOCK_MODULE.MASTER_DATA.BRANCH_NAME") }, validationRules: [{ type: "required" }], editorOptions: { items: this.branchesList, displayExpr: "Name", valueExpr: "Id" } },
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
      ... this.ProductGridColumns
    ]
    this.ProductGridColumns.push({ cellTemplate: 'increaseCount', formItem: { visible: false }, allowEditing: false, allowSorting: false, allowFiltering: false });
  }


  propertyDisplayValue(rowData) {
    return this._translate.instant(rowData.Translate);
  }

}
