import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { DxSelectBoxComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-campaign-applying-screen',
  templateUrl: './campaign-applying-screen.component.html',
  styleUrls: ['./campaign-applying-screen.component.scss']
})
export class CampaignApplyingScreenComponent implements OnInit {
  campaignsSelectBoxDS: DataSource;

  constructor(private dxStore: DxStoreService,
    public dialogRef: MatDialogRef<CampaignApplyingScreenComponent>) { }

  ngOnInit(): void {
    this.InitilizeCampaignsList();
  }
  InitilizeCampaignsList() {
    let storeOptions: DxStoreOptions = {
      loadUrl: "Campaign/Get", Key: "Id"
    };

    this.campaignsSelectBoxDS = new DataSource({
      store: this.dxStore.GetStore(storeOptions),
      paginate: true,
      pageSize: 10
    });
  }

  applyCampaign(e, campaignSelectBox: DxSelectBoxComponent) {
    this.dialogRef.close(campaignSelectBox.selectedItem.Id)
  }

}
