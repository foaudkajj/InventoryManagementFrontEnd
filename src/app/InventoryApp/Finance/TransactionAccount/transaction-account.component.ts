import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import Store from 'devextreme/data/abstract_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-transaction-account',
  templateUrl: './transaction-account.component.html',
  styleUrls: ['./transaction-account.component.scss']
})
export class TransactionAccountComponent implements OnInit {
  TransactionAccountDS: DataSource;
  TransactionCardsStore: Store;
  PaymentMethodsStore: Store;
  TransactionTypeStore: Store;
  @ViewChild('grid') gridInstance: DxDataGridComponent;
  today: Date = new Date();
  constructor(private dxStore: DxStoreService, private translate: TranslateService) {
    this.getEnumTextTranslation = this.getEnumTextTranslation.bind(this);
  }

  ngOnInit(): void {
    this.filTable();
  }
  filTable() {
    let storeOption: DxStoreOptions = {
      loadUrl: "TransactionAccount/Get", insertUrl: "TransactionAccount/Insert", updateUrl: "TransactionAccount/Update", deleteUrl: "TransactionAccount/Delete", updateMethod: "POST", Key: "Id",
      onInserted: () => this.gridInstance.instance.refresh(),
      onRemoved: () => this.gridInstance.instance.refresh(),
      onUpdated: () => this.gridInstance.instance.refresh()
    };

    this.TransactionAccountDS = new DataSource({
      store: this.dxStore.GetStore(storeOption),
    });



    this.TransactionCardsStore = this.dxStore.GetStore(<DxStoreOptions>{ loadUrl: "TransactionCard/Get", Key: "Id" });

    this.PaymentMethodsStore = this.dxStore.GetStore(<DxStoreOptions>{ loadUrl: "PaymentMethods/Get", Key: "Id" });

    this.TransactionTypeStore = this.dxStore.GetStore(<DxStoreOptions>{ loadUrl: "EnumAsList/Get?enumName=TransactionTypes", Key: "Id" });
  }

  getEnumTextTranslation(item) {
    return item && this.translate.instant(item.Translate);
  }

}
