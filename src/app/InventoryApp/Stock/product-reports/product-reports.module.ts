import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductReportsRoutingModule } from './product-reports-routing.module';
import { ProductReportsComponent } from './product-reports.component';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ProductReportsComponent],
  imports: [
    InventorySharedModule,
    ProductReportsRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class ProductReportsModule { }
