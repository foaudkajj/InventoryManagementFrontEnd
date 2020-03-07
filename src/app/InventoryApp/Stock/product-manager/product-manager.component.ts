import { Component, OnInit } from '@angular/core';
import { Product } from 'app/InventoryApp/Models/Product';
import { map } from 'rxjs/operators';
import { from, interval, timer } from 'rxjs';
import { ProductView } from 'app/InventoryApp/Models/DTOs/ProductView';
import html2canvas from 'html2canvas';
import { Color } from 'app/InventoryApp/Models/Color';
import { Branch } from 'app/InventoryApp/Models/Branch';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorsService } from 'app/InventoryApp/services/Colors.service';
import { ProductService } from 'app/InventoryApp/services/products.service';
import { Barcode } from 'app/InventoryApp/Models/DTOs/Barcode';
import * as jsPDF from 'jspdf';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  BarcodeObject: Barcode = new Barcode();
  ProductForm: FormGroup;
  colorsList: Color[];
  branchesList: Branch[];
  Genders: any = [{ Value: 0, ViewValue: 'Erkek' }, { Value: 1, ViewValue: 'Kadın' }]
  displayedColumns = ['ProductName', 'ProductCode', 'ColorName', 'Gender', 'Price', 'ProductYear', 'Size', 'BranchName', 'Count', 'ProductFullCode', 'actions'];
  dataSource: any; //MatTableDataSource<ProductView> = new MatTableDataSource();
  selectedProducts: [] = [];
  constructor(private fb: FormBuilder, private colorService: ColorsService, private productService: ProductService, private branchesService: BranchesService, public translate: TranslateService) { }

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
    this.productService.GetProducts().toPromise().then((res: ProductView[]) => this.dataSource = res);
  }
  getBranches() {
    this.branchesService.GetBranches().toPromise().then(res => this.branchesList = (res as Branch[]))
  }
  getColors() {
    this.colorService.GetColors().toPromise().then(res => this.colorsList = (res as Color[]));
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
    if (!this.ProductForm.invalid) {

      // The next object is created to send to DB
      const product: Product[] = [{
        ColorId: this.ProductForm.controls.Color.value,
        Gender: this.ProductForm.controls.Gender.value,
        Price: this.ProductForm.controls.Price.value,
        ProductCode: this.ProductForm.controls.ProductCode.value,
        ProductFullCode: null,
        ProductName: this.ProductForm.controls.ProductName.value,
        ProductYear: this.ProductForm.controls.ProductYear.value,
        Size: this.ProductForm.controls.Size.value,
        BranchId: this.ProductForm.controls.Branch.value,
        Count: this.ProductForm.controls.Count.value
      }];
      product[0].ProductFullCode = (product[0].Gender ? "K" : "E") + product[0].ProductYear.slice(product[0].ProductYear.length - 3) + product[0].ProductCode + this.colorsList.find(fi => fi.Id == product[0].ColorId).ShortenColor + product[0].Size;


      this.productService.AddProducts(product).toPromise().finally(() => { this.filTable(); this.ProductForm.reset(); });
    }


  }

  Fill() {
    if (!this.ProductForm.invalid) {
      let shoe: Product = {
        ColorId: this.ProductForm.controls.Color.value,
        Gender: this.ProductForm.controls.Gender.value,
        Price: this.ProductForm.controls.Price.value,
        ProductCode: this.ProductForm.controls.ProductCode.value,
        ProductFullCode: null,
        ProductName: this.ProductForm.controls.ProductName.value,
        ProductYear: this.ProductForm.controls.ProductYear.value,
        Size: this.ProductForm.controls.Size.value,
        BranchId: this.ProductForm.controls.Branch.value,
        Count: this.ProductForm.controls.Count.value
      };


      const shoes: Product[] = [];
      // Gender 0 ise Erkek demektir
      if (shoe.Gender == true) {
        from([35, 36, 37, 38, 39]).subscribe(size => {
          let fullCode = "K" + shoe.ProductYear + shoe.ProductCode + shoe.ColorId + size;
          shoes.push({
            ColorId: shoe.ColorId, Gender: true, Price: shoe.Price, ProductCode: shoe.ProductCode, ProductFullCode: fullCode, ProductName: shoe.ProductName, ProductYear: shoe.ProductYear, Size: size, BranchId: shoe.BranchId,
            Count: shoe.Count
          });
        });
      } else {
        from([40, 41, 42, 43, 44, 45, 46]).pipe(map(size => {

          let fullCode = "E" + shoe.ProductYear + shoe.ProductCode + shoe.ColorId + size;
          shoes.push({
            ColorId: shoe.ColorId, Gender: false, Price: shoe.Price, ProductCode: shoe.ProductCode, ProductFullCode: fullCode, ProductName: shoe.ProductName, ProductYear: shoe.ProductYear, Size: size, BranchId: shoe.BranchId,
            Count: shoe.Count
          });
        })).subscribe();
      }

      this.productService.AddProducts(shoes).toPromise().finally(() => { this.filTable(); this.ProductForm.reset(); });
    }
  }

  DeleteFromColorTB(row: ProductView) {
    this.productService.DeleteProduct(row.Id).toPromise().then(_ => this.filTable());
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'printButton',
    });
  }

  async PrintButton() {
    console.log(this.selectedProducts)
    for (const selectedProduct of this.selectedProducts) {
      await this.ShowProductTag(selectedProduct);
      console.log(selectedProduct)
    }
  }


  timouted: false;
  async ShowProductTag(row: ProductView) {
    this.BarcodeObject.BarcodeValue = row.ProductFullCode;
    this.BarcodeObject.Color = row.ColorName;
    this.BarcodeObject.Size = row.Size;

    await timer(1000).toPromise()
    await this.downloadAsPDF();

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
