import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ColorsService } from 'app/InventoryApp/services/Colors.service';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { PaymentMethodsService } from 'app/InventoryApp/services/payment-methods.service';
import { PaymentMethod } from 'app/InventoryApp/Models/PaymentMethod';
import { Color } from 'app/InventoryApp/Models/Color';
import { Branch } from 'app/InventoryApp/Models/Branch';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import CustomStore from 'devextreme/data/custom_store';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { Column } from 'devextreme/ui/data_grid';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'app/InventoryApp/services/Swal.Service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {
  // Array contains placeholders we want to show.
  FormFieldsPlaceholder = [];
  MasterDatasFormGroup: FormGroup;
  MasterData: any;
  MDFormShow: boolean = null;
  formFields = [];
  // This is used to know the selected Master Data
  SelectedMDNumber: number;
  MasterDataStore: CustomStore;
  Columns: Column[];
  @ViewChild("MasterDataGrid") MasterDataGrid: DxDataGridComponent;

  constructor(private fb: FormBuilder,
    public _translate: TranslateService,
    private swal: SwalService,
    private dxStore: DxStoreService
  ) {
  }

  ngOnInit() {
    this.MasterData = [{ Value: 0, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.BRANCHES') },
    { Value: 1, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.COLORS') },
    { Value: 2, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.PAYMENT_METHODS') },
    { Value: 3, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_TYPE') },
    { Value: 4, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_PROPERTY') },
    ]
  }



  MDChanged(value) {
    let MasterDataStoreOptions: DxStoreOptions;
    if (value == 0) {
      MasterDataStoreOptions = {
        loadUrl: "Branches/Get", deleteUrl: "Branches/Delete", deleteMethod: "POST", updateUrl: "Branches/Update", updateMethod: "POST", insertUrl: "Branches/Insert", Key: "Id"
      };
      this.Columns = [{ dataField: "Name", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.BRANCH_NAME') }, { dataField: "Location", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.BRANCH_ADRES') }];
    } else if (value == 1) {
      MasterDataStoreOptions = {
        loadUrl: "Colors/Get", deleteUrl: "Colors/Delete", deleteMethod: "POST", updateUrl: "Colors/Update", updateMethod: "POST", insertUrl: "Colors/Insert", Key: "Id"
      };
      this.Columns = [{ dataField: "ColorName", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.COLORS') }, { dataField: "ShortenColor", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.COLORS_SHORTCODES') }];
    } else if (value == 2) {
      MasterDataStoreOptions = {
        loadUrl: "PaymentMethods/Get", deleteUrl: "PaymentMethods/Delete", deleteMethod: "POST", updateUrl: "PaymentMethods/Update", updateMethod: "POST", insertUrl: "PaymentMethods/Insert", Key: "Id"
      };
      this.Columns = [{ dataField: "PaymentName", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PAYMENT_NAME') }, { dataField: "PaymentType", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PAYMENT_TYPE') }];
    } else if (value == 3) {
      MasterDataStoreOptions = {
        loadUrl: "ProductProperty/Get", deleteUrl: "ProductProperty/Delete", deleteMethod: "POST", updateUrl: "ProductProperty/Update", updateMethod: "POST", insertUrl: "ProductProperty/Insert", Key: "Id"
      };
      this.Columns = [{ dataField: "Name", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_PROPERTY_NAME') }, { dataField: "Type", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_PROPERTY_TYPE') }];
    } else if (value == 4) {
      MasterDataStoreOptions = {
        loadUrl: "ProductType/Get", deleteUrl: "ProductType/Delete", deleteMethod: "POST", updateUrl: "ProductType/Update", updateMethod: "POST", insertUrl: "ProductType/Insert", Key: "Id"
      };
      this.Columns = [{ dataField: "Name", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_TYPE_NAME') }];
    }

    this.MasterDataStore = this.dxStore.GetStore({
      ...MasterDataStoreOptions,
      onInserted: () => { this.swal.showSuccessMessage(); this.MasterDataGrid.instance.refresh() },
      onRemoved: () => { this.swal.showSuccessMessage(); this.MasterDataGrid.instance.refresh() },
      onUpdated: () => { this.swal.showSuccessMessage(); this.MasterDataGrid.instance.refresh() }
    });

  }

}
