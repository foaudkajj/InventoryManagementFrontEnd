import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionCardRoutingModule } from './transaction-card-routing.module';
import { TransactionCardComponent } from './transaction-card.component';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';


@NgModule({
  declarations: [
    TransactionCardComponent
  ],
  imports: [
    InventorySharedModule,
    TransactionCardRoutingModule
  ]
})
export class TransactionCardModule { }
