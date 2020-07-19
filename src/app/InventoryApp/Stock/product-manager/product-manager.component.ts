import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/InventoryApp/Models/Product';
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
import * as jsPDF from 'jspdf';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';

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
  Genders: any = [{ Value: false, ViewValue: 'Erkek' }, { Value: true, ViewValue: 'Kadın' }]
  displayedColumns = ['ProductName', 'ProductCode', 'ColorName', 'Gender', 'Price', 'SellingPrice', 'ProductYear', 'Size', 'BranchName', 'Count', 'ProductFullCode', 'actions'];
  dataSource: DataSource; //MatTableDataSource<ProductView> = new MatTableDataSource();
  store: CustomStore;
  selectedProducts: [] = [];
  constructor(private fb: FormBuilder, private colorService: ColorsService, private productService: ProductService, private branchesService: BranchesService, public _translate: TranslateService) { }

  ngOnInit() {
    //   var dataSource = new DevExpress.data.DataSource({
    //     //DataSource configuration
    //     sort: "name",
    //     pageSize: 10,
    //     //data access logic
    //     load: function(loadOptions) {
    //         return array;
    //     },
    //     byKey: function(key) {
    //         return array[key];
    //     },
    //     ...
    // });

    this.initLoginForm();
    this.getColors();
    this.getBranches();
    this.filTable()
  }

  filTable() {
    this.store = createStore({
      key: "Id",
      loadUrl: "https://localhost:44382/api/Products/",
      insertUrl: "https://localhost:44382/api/Products",
      updateUrl: "https://localhost:44382/api/Products/PutProduct",
      deleteUrl: "https://localhost:44382/api/Products",
      onInserted: () => { this.ProductForm.reset(); this.productsGrid.instance.refresh(); },
      onRemoved: () => { this.productsGrid.instance.refresh(); }
    })

  }
  getBranches() {
    this.branchesService.GetBranches().toPromise().then(res => this.branchesList = (res.data as Branch[]))
  }
  getColors() {
    this.colorService.GetColors().toPromise().then(res => this.colorsList = (res.data as Color[]));
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
        Validators.maxLength(2)
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

  rows: Product[] = [];
  AddRow() {
    // this.productsGrid.instance.addRow()
    if (!this.ProductForm.invalid) {

      // The next object is created to send to DB
      const product: Product[] = [{
        ColorId: this.ProductForm.controls.Color.value,
        Gender: this.ProductForm.controls.Gender.value,
        Price: this.ProductForm.controls.Price.value,
        SellingPrice: this.ProductForm.controls.SellingPrice.value,
        ProductCode: this.ProductForm.controls.ProductCode.value,
        ProductFullCode: null,
        ProductName: this.ProductForm.controls.ProductName.value,
        ProductYear: this.ProductForm.controls.ProductYear.value,
        Size: this.ProductForm.controls.Size.value,
        BranchId: this.ProductForm.controls.Branch.value,
        Count: this.ProductForm.controls.Count.value
      }];
      product[0].ProductFullCode = this.GetProductFullCode(product[0]);

      this.store.insert(product);
      // this.productService.AddProducts(product).toPromise().finally(() => { this.filTable(); this.ProductForm.reset(); });
    }


  }
  GetProductFullCode(product: Product) {
    return (product.Gender ? "K" : "E") + product.ProductYear.slice(product.ProductYear.length - 3) + product.ProductCode + this.colorsList.find(fi => fi.Id == product.ColorId).ShortenColor + product.Size;
  }

  Fill() {
    if (!this.ProductForm.invalid) {
      let product: Product = {
        ColorId: this.ProductForm.controls.Color.value,
        Gender: this.ProductForm.controls.Gender.value,
        Price: this.ProductForm.controls.Price.value,
        SellingPrice: this.ProductForm.controls.SellingPrice.value,
        ProductCode: this.ProductForm.controls.ProductCode.value,
        ProductFullCode: null,
        ProductName: this.ProductForm.controls.ProductName.value,
        ProductYear: this.ProductForm.controls.ProductYear.value,
        Size: this.ProductForm.controls.Size.value,
        BranchId: this.ProductForm.controls.Branch.value,
        Count: this.ProductForm.controls.Count.value
      };


      const products: Product[] = [];
      // Gender 1 ise Kadin demektir
      if (product.Gender == true) {
        from([35, 36, 37, 38, 39, 40, 41]).subscribe(size => {
          product.Gender = true;
          product.Size = size;
          let fullCode = this.GetProductFullCode(product);
          products.push({
            ColorId: product.ColorId, Gender: product.Gender, Price: product.Price, ProductCode: product.ProductCode, ProductFullCode: fullCode, ProductName: product.ProductName, ProductYear: product.ProductYear, Size: size, BranchId: product.BranchId,
            Count: product.Count, SellingPrice: product.SellingPrice
          });
        });
      } else {
        from([39, 40, 41, 42, 43, 44, 45, 46]).pipe(map(size => {
          product.Gender = false;
          product.Size = size;
          let fullCode = this.GetProductFullCode(product);
          products.push({
            ColorId: product.ColorId, Gender: product.Gender, Price: product.Price, ProductCode: product.ProductCode, ProductFullCode: fullCode, ProductName: product.ProductName, ProductYear: product.ProductYear, Size: size, BranchId: product.BranchId,
            Count: product.Count, SellingPrice: product.SellingPrice
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
    for (const selectedProduct of this.productsGrid.instance.getSelectedRowsData()) {
      await this.ShowProductTag(selectedProduct);
      this.productsGrid.instance.clearSelection();
    }
  }


  timouted: false;
  async ShowProductTag(row: ProductView) {
    this.BarcodeObject.BarcodeValue = row.ProductFullCode;
    console.log(row)
    this.BarcodeObject.Color = row.Color.ColorName;
    this.BarcodeObject.Size = row.Size;
    this.BarcodeObject.Price = row.Price;
    this.BarcodeObject.Date = Date.now().toString();

    await timer(1000).toPromise()
    await this.downloadAsPDF();

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

}
