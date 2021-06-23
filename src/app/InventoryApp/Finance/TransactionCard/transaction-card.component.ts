import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import Store from 'devextreme/data/abstract_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent implements OnInit {
  GridDs: DataSource;
  TransactionAccountDS: DataSource;
  TransactionTypeStore: Store;
  CurrenciesStore: Store;
  TransactionCardsStore: Store;
  PaymentMethodsStore: Store;
  @ViewChild('grid') gridInstance: DxDataGridComponent;
  constructor(private dxStore: DxStoreService, private translate: TranslateService) {
    this.getEnumTextTranslation = this.getEnumTextTranslation.bind(this);
  }

  ngOnInit(): void {
    this.filTable();
  }
  filTable() {
    let storeOption: DxStoreOptions = {
      loadUrl: "TransactionCard/Get", insertUrl: "TransactionCard/Insert", updateUrl: "TransactionCard/Update", deleteUrl: "TransactionCard/Delete", updateMethod: "POST", Key: "Id",
      onInserted: () => this.gridInstance.instance.refresh(),
      onRemoved: () => this.gridInstance.instance.refresh(),
      onUpdated: () => this.gridInstance.instance.refresh()
    };

    this.GridDs = new DataSource({
      store: this.dxStore.GetStore(storeOption)
    });

    this.CurrenciesStore = this.dxStore.GetStore(<DxStoreOptions>{ loadUrl: "Currency/Get", Key: "Id" });



    this.TransactionAccountDS = new DataSource({
      store: this.dxStore.GetStore(<DxStoreOptions>{ loadUrl: "TransactionAccount/Get", Key: "Id", }),
    });

    this.TransactionCardsStore = this.dxStore.GetStore(<DxStoreOptions>{ loadUrl: "TransactionCard/Get", Key: "Id" });
    this.PaymentMethodsStore = this.dxStore.GetStore(<DxStoreOptions>{ loadUrl: "PaymentMethods/Get", Key: "Id" });
    this.TransactionTypeStore = this.dxStore.GetStore(<DxStoreOptions>{ loadUrl: "EnumAsList/Get?enumName=TransactionTypes", Key: "Id" });

  }

  getEnumTextTranslation(item) {
    return item && this.translate.instant(item.Translate);
  }

}
