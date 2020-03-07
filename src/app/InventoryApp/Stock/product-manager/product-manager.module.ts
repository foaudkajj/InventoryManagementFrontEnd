import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagerRoutingModule } from './product-manager-routing.module';
import { ProductManagerComponent } from './product-manager.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorsService } from 'app/InventoryApp/services/Colors.service';
import { ProductService } from 'app/InventoryApp/services/products.service';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EticketTemplateComponent } from './eticket-template/eticket-template.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { DxBoxModule, DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [ProductManagerComponent,EticketTemplateComponent],
  imports: [
    CommonModule,
    ProductManagerRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatIconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    NgxBarcodeModule,
    DxBoxModule,
    DxDataGridModule
  ],
  providers:[ColorsService,ProductService,BranchesService]
})
export class ProductManagerModule { }
