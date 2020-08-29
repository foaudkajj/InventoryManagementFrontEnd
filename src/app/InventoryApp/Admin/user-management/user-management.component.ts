import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { Branch } from 'app/InventoryApp/Models/Branch';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  branchesList: Branch[];
  UsersGridDataSource: any;
  @ViewChild('UsersGrid') UsersGrid: DxDataGridComponent
  store: CustomStore;
  UserStatus = [{ Id: 1, Name: 'Aktif' }, { Id: 0, Name: 'Pasif' }];
  constructor(public translate: TranslateService,
    private branchesService: BranchesService,
    private dxStore: DxStoreService) { }

  ngOnInit(): void {
    this.getBranches();
    this.filTable();
  }


  getBranches() {
    this.branchesService.GetBranches().toPromise().then(res => this.branchesList = (res.data as Branch[]))
  }

  filTable() {
    let storeOption: DxStoreOptions = {
      loadUrl: "User/GetUsers", insertUrl: "User/InsertUser", updateUrl: "User", deleteUrl: "User/DeleteUser", Key: "Id",
      onInserted: () => this.UsersGrid.instance.refresh(),
      onRemoved: () => this.UsersGrid.instance.refresh()
    };
    this.store = this.dxStore.GetStore(storeOption);

  }

}
