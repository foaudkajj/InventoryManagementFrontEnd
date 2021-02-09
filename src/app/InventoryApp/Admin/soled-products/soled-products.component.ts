import { Component, OnInit } from '@angular/core';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-soled-products',
  templateUrl: './soled-products.component.html',
  styleUrls: ['./soled-products.component.scss']
})
export class SoledProductsComponent implements OnInit {
  soledProductsStore: CustomStore;
  today: Date = new Date();
  constructor(private dxStore: DxStoreService) { }

  ngOnInit(): void {
    let storeOptions: DxStoreOptions = {
      loadUrl: "NormalSatis/GetSelledProductsByUserId", Key: "Id"
    };
    this.soledProductsStore = this.dxStore.GetStore(storeOptions);
  }

}
