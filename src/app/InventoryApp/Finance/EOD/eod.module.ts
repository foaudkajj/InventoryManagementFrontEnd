import { NgModule } from '@angular/core';

import { EODComponent } from './eod.component';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';
import { EoDRoutingModule } from './eod-routing.module';


@NgModule({
  declarations: [
    EODComponent
  ],
  imports: [
    InventorySharedModule,
    EoDRoutingModule
  ]
})
export class EoDModule { }
