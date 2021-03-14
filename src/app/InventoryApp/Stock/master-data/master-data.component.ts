import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DxStoreOptions } from 'app/InventoryApp/Models/DxStoreOptions';
import CustomStore from 'devextreme/data/custom_store';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { Column } from 'devextreme/ui/data_grid';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'app/InventoryApp/services/Swal.Service';
import { DxDataGridComponent } from 'devextreme-angular';
import { ProductTypeService } from 'app/InventoryApp/services/product-type.service';
import { AddPropertiesToProductTypeDto } from 'app/InventoryApp/Models/DTOs/AddPropertiesToProductType';
import { UIResponse } from 'app/InventoryApp/Models/UIResponse';
import { GridConf } from 'app/InventoryApp/Models/DTOs/GridConf';
import Query from "devextreme/data/query";

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
  MasterDetailStore: CustomStore;
  Columns: Column[];
  MasterDetailColumns: Column[];
  gridConf: GridConf = new GridConf();
  @ViewChild("MasterDataGrid") MasterDataGrid: DxDataGridComponent;
  @ViewChild("masterDetailGrid") MasterDetailGrid: DxDataGridComponent;
  // query = DevExpress.data.query;

  constructor(private fb: FormBuilder,
    public _translate: TranslateService,
    private swal: SwalService,
    private dxStore: DxStoreService,
    private productTypeService: ProductTypeService
  ) {
    this.tagBoxShowValue = this.tagBoxShowValue.bind(this);
  }

  ngOnInit() {
    this.MasterData = [{ Value: 0, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.BRANCHES') },
    { Value: 1, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.COLORS') },
    { Value: 2, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.PAYMENT_METHODS') },
    { Value: 3, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_TYPE') },
    { Value: 4, ViewValue: this._translate.instant('STOCK_MODULE.MASTER_DATA.CAMPAIGNS') },
    ]
  }



  MDChanged(value) {
    this.SelectedMDNumber = value;


    let MasterDataStoreOptions: DxStoreOptions;
    let MasterDetailStoreOptions: DxStoreOptions;
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
    }
    else if (value == 3) {
      MasterDataStoreOptions = {
        loadUrl: "ProductType/Get", deleteUrl: "ProductType/Delete", deleteMethod: "POST", updateUrl: "ProductType/Update", updateMethod: "POST", insertUrl: "ProductType/Insert", Key: "Id"
      };
      this.Columns = [{ dataField: "Name", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_TYPE_NAME') }];

      MasterDetailStoreOptions = {
        loadUrl: "ProductProperty/Get", deleteUrl: "ProductProperty/Delete", deleteMethod: "POST", updateUrl: "ProductProperty/Update", updateMethod: "POST", insertUrl: "ProductProperty/Insert", Key: "Id"
      };
      this.MasterDetailColumns = [{ dataField: "DataField", caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_PROPERTY_NAME') }];
    } else if (value == 4) {

      MasterDataStoreOptions = {
        loadUrl: "Campaign/Get", deleteUrl: "Campaign/Delete", deleteMethod: "POST", updateUrl: "Campaign/Update", updateMethod: "POST", insertUrl: "Campaign/Insert", Key: "Id"
      };
      this.Columns = [{ dataField: "Name", caption: this._translate.instant('STOCK_MODULE.CAMPAIGN.NAME') },
      { dataField: "Percent", caption: this._translate.instant('STOCK_MODULE.CAMPAIGN.PERCENT') },
      { dataField: "StartDate", caption: this._translate.instant('STOCK_MODULE.CAMPAIGN.START_DATE'), dataType: "date" },
      { dataField: "EndDate", caption: this._translate.instant('STOCK_MODULE.CAMPAIGN.END_DATE'), dataType: "date" },
      { dataField: "Description", caption: this._translate.instant('STOCK_MODULE.CAMPAIGN.DESCRIPTION') }];
    }



    this.MasterDataStore = this.dxStore.GetStore({
      ...MasterDataStoreOptions,
      onInserted: () => this.MasterDataGrid.instance.refresh(),
      onRemoved: () => this.MasterDataGrid.instance.refresh(),
      onUpdated: () => this.MasterDataGrid.instance.refresh()
    });


    if (value == 3) {
      this.MasterDetailStore = this.dxStore.GetStore({
        ...MasterDetailStoreOptions,
        onInserted: () => this.MasterDetailGrid.instance.refresh(),
        onRemoved: () => this.MasterDetailGrid.instance.refresh(),
        onUpdated: () => this.MasterDetailGrid.instance.refresh()
      });
    }


  }


  async ButtonClick(selectedKeys: any[], parentRowId: number) {
    if (this.SelectedMDNumber == 3) {
      const AddPropertiesToProductType: AddPropertiesToProductTypeDto = { productProperties: selectedKeys.map(mp => mp.Id), productTypeId: parentRowId };
      let response: UIResponse<any> = await this.productTypeService.AddPropertiesToProductType(AddPropertiesToProductType).toPromise();
      if (response.IsError) {
        this.swal.showErrorMessage();
      } else {
        this.swal.showSuccessMessage();
      }
    }
  }

  tagBoxShowValue(row) {
    if (this.SelectedMDNumber == 3) {
      return row && this._translate.instant(row.Translate)
    }
  }

  gridEditorPreparing(e) {
    if (this.SelectedMDNumber == 4) {
      if (e.parentType === "dataRow" && (e.dataField === "Name" || e.dataField === "Percent") && !e.row.isNewRow) {
        e.editorOptions.disabled = true;
      }
    }
  }

}
