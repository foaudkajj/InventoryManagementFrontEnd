import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddPropertiesToProductTypeDto } from '../Models/DTOs/AddPropertiesToProductType';

@Injectable({
    providedIn: 'root'
})
export class ProductTypeService extends BaseService {
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);
    }

    AddPropertiesToProductType(ProductTypeAndProperties: AddPropertiesToProductTypeDto): Observable<any> {
        let result$ = this.post(`ProductType/AddPropertiesToProductType`, ProductTypeAndProperties);
        return result$;
    }

    GetList(): Observable<any> {
        let result$ = this.get(`ProductType/Get`);
        return result$;
    }

}
