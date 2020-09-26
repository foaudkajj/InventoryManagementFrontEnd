import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleManagementComponent } from './role-management.component';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { DxTreeListModule } from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { RoleService } from 'app/InventoryApp/services/Role.Service';


@NgModule({
  declarations: [RoleManagementComponent],
  imports: [
    InventorySharedModule,
    RoleManagementRoutingModule,
    DxTreeListModule,
    MatButtonModule
  ],
  providers: [DxStoreService, RoleService]
})
export class RoleManagementModule { }
