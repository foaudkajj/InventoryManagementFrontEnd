import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Branch } from '../Models/Branch';
import { CustomerInfoDto } from '../Models/DTOs/CustomerInfoDto';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { environment } from 'environments/environment';
import { DxStoreOptions } from '../Models/DxStoreOptions';


@Injectable()
export class DxStoreService {
    constructor() {
    }

    GetStore(storeOptions: DxStoreOptions): CustomStore {
        return createStore({
            key: storeOptions.Key,
            loadUrl: environment.apiUrl + storeOptions.loadUrl,
            insertUrl: environment.apiUrl + storeOptions.insertUrl,
            updateUrl: environment.apiUrl + storeOptions.updateUrl,
            deleteUrl: environment.apiUrl + storeOptions.deleteUrl,
            onInserted: storeOptions.onInserted,
            onRemoved: storeOptions.onRemoved,
            onBeforeSend: (method, ajaxOptions) => {
                ajaxOptions.headers = {
                    "Authorization": "Bearer " + sessionStorage.getItem("Authorization")
                }
                return storeOptions.OnBeforeSend;
            }
        })
    }
}
