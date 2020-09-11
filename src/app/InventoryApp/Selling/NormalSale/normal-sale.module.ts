import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NormalSaleRoutingModule } from './normal-sale-routing.module';
import { NormalSaleComponent } from './normal-sale.component';
import { DxDataGridModule, DxDateBoxModule, DxLookupModule, DxSelectBoxModule } from 'devextreme-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaymentScreenComponent } from '../PaymentScreen/payment-screen.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PaymentMethodsService } from 'app/InventoryApp/services/payment-methods.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { ConsumerInfosService } from 'app/InventoryApp/services/ConsumerInfo.service';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';


@NgModule({
  declarations: [NormalSaleComponent, PaymentScreenComponent],
  imports: [
    NormalSaleRoutingModule,
    DxDataGridModule,
    DxDateBoxModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    DxLookupModule,
    MatGridListModule,
    DxSelectBoxModule,
    InventorySharedModule
  ],
  entryComponents: [PaymentScreenComponent],
  providers: [PaymentMethodsService, ConsumerInfosService]
})
export class NormalSaleModule { }
