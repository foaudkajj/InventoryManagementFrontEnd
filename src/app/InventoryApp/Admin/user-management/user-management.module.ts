import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { DxDataGridModule } from 'devextreme-angular';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { RoleService } from 'app/InventoryApp/services/Role.Service';


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    DxDataGridModule
  ],
  providers: [DxStoreService, BranchesService, RoleService]
})
export class UserManagementModule { }
