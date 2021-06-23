import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionAccountRoutingModule } from './transaction-account-routing.module';
import { TransactionAccountComponent } from './transaction-account.component';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';


@NgModule({
  declarations: [
    TransactionAccountComponent
  ],
  imports: [
    InventorySharedModule,
    TransactionAccountRoutingModule
  ]
})
export class TransactionAccountModule { }
