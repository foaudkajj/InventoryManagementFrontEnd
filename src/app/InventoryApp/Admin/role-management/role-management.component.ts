import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RoleIdAndPermessions } from 'app/InventoryApp/Models/DTOs/RoleIdAndPermessions';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { RoleService } from 'app/InventoryApp/services/Role.Service';
import { SwalService } from 'app/InventoryApp/services/Swal.Service';
import { DxDataGridComponent, DxTreeListComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  @ViewChild('RolesGrid') RolesGrid: DxDataGridComponent;
  @ViewChild('PermessionsTree') PermessionsTree: DxTreeListComponent;

  rolesGridDS: DataSource;
  permessionsListDS: DataSource;
  constructor(public translate: TranslateService,
    private dxStore: DxStoreService,
    private RolesService: RoleService,
    private swal: SwalService) {
    this.treeListTitleDisplayValue = this.treeListTitleDisplayValue.bind(this)
  }

  ngOnInit(): void {
    this.filGrid();
  }

  filGrid() {
    let usersGridStoreOption: DxStoreOptions = {
      loadUrl: "Roles/GetRoles", insertUrl: "Roles/AddRoles", deleteUrl: "Roles/DeleteRole", deleteMethod: "POST", Key: "Id",
      onInserted: () => this.RolesGrid.instance.refresh(),
      onRemoved: () => this.RolesGrid.instance.refresh(),
      onUpdated: () => this.RolesGrid.instance.refresh()
    };
    this.rolesGridDS = new DataSource({
      store: this.dxStore.GetStore(usersGridStoreOption)
    })

    let permessionsListStoreOption: DxStoreOptions = {
      loadUrl: "Roles/GetRolePermessions", Key: "Id",
      onInserted: () => this.PermessionsTree.instance.refresh(),
      onRemoved: () => this.PermessionsTree.instance.refresh(),
      onUpdated: () => this.PermessionsTree.instance.refresh()
    };
    this.permessionsListDS = new DataSource({
      store: this.dxStore.GetStore(permessionsListStoreOption)
    })

  }

  async Save(keys: any[], roleId: number) {
    const roleIdAndPermessions: RoleIdAndPermessions = { roleId: roleId, rolePermessions: keys };
    await this.RolesService.SaveRolePermessions(roleIdAndPermessions).pipe(tap(t => this.swal.showSuccessMessage())).toPromise();
  }

  treeListTitleDisplayValue(rowData) {
    return this.translate.instant(rowData.Translate);
  }
}
