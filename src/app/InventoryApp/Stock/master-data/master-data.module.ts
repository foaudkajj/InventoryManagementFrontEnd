import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { MasterDataComponent } from './master-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ColorsService } from 'app/InventoryApp/services/Colors.service';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { PaymentMethodsService } from 'app/InventoryApp/services/payment-methods.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MasterDataComponent],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [ColorsService, BranchesService, PaymentMethodsService]
})
export class MasterDataModule { }
