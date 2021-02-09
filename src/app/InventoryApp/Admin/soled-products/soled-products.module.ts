import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoledProductsRoutingModule } from './soled-products-routing.module';
import { SoledProductsComponent } from './soled-products.component';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';


@NgModule({
  declarations: [SoledProductsComponent],
  imports: [
    InventorySharedModule,
    SoledProductsRoutingModule
  ]
})
export class SoledProductsModule { }
