import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { DxDataGridModule } from 'devextreme-angular';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    DxDataGridModule
  ],
  providers: [DxStoreService, BranchesService]
})
export class UserManagementModule { }
