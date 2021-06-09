import { Component, OnInit } from '@angular/core';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-soled-products',
  templateUrl: './soled-products.component.html',
  styleUrls: ['./soled-products.component.scss']
})
export class SoledProductsComponent implements OnInit {
  soledProductsDS: DataSource;
  today: Date = new Date();
  constructor(private dxStore: DxStoreService) { }

  ngOnInit(): void {
    let storeOptions: DxStoreOptions = {
      loadUrl: "NormalSatis/GetSelledProductsByUserId", Key: "Id"
    };
    this.soledProductsDS = new DataSource({
      store: this.dxStore.GetStore(storeOptions)
    })
  }

}
