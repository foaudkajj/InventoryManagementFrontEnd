import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { Branch } from 'app/InventoryApp/Models/Branch';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { RoleService } from 'app/InventoryApp/services/Role.Service';
import { Role } from 'app/InventoryApp/Models/Role';
import { SwalService } from 'app/InventoryApp/services/Swal.Service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  branchesList: Branch[];
  rolList: Role[];
  UsersGridDataSource: any;
  @ViewChild('UsersGrid') UsersGrid: DxDataGridComponent
  store: CustomStore;
  UserStatus = [{ Id: 1, Name: 'Aktif' }, { Id: 0, Name: 'Pasif' }];
  constructor(public translate: TranslateService,
    private branchesService: BranchesService,
    private roleService: RoleService,
    private dxStore: DxStoreService,
    private swal: SwalService) { }

  ngOnInit(): void {
    this.getBranches();
    this.getRoles();
    this.filTable();
  }



  getRoles() {
    this.roleService.GetRoles().toPromise().then(res => this.rolList = (res.data as Role[]));
  }
  getBranches() {
    this.branchesService.GetBranches().toPromise().then(res => this.branchesList = (res.data as Branch[]));
  }

  filTable() {
    let storeOption: DxStoreOptions = {
      loadUrl: "User/GetUsers", insertUrl: "User/InsertUser", updateUrl: "User/UpdateUser", updateMethod: "POST", deleteUrl: "User/DeleteUser", Key: "Id",
      onInserted: () => { this.swal.showSuccessMessage(); this.UsersGrid.instance.refresh() },
      onRemoved: () => { this.swal.showSuccessMessage(); this.UsersGrid.instance.refresh() },
      onUpdated: () => { this.swal.showSuccessMessage(); this.UsersGrid.instance.refresh() }
    };
    this.store = this.dxStore.GetStore(storeOption);

  }

}
