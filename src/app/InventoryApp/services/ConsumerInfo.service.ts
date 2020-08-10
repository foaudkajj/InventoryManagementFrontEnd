import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Branch } from '../Models/Branch';
import { CustomerInfoDto } from '../Models/DTOs/CustomerInfoDto';

@Injectable()
export class ConsumerInfosService extends BaseService {
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);
    }

    GetConsumerInfos(): Observable<any> {
        let result$ = this.get(`CustomerInfo`);
        return result$;
    }

    ModifyConsumerInfo(id: number, color: CustomerInfoDto): Observable<any> {
        let result$ = this.put(`CustomerInfo/${id}`, color);
        return result$;
    }

    AddConsumerInfos(colors: CustomerInfoDto[]): Observable<any> {
        let result$ = this.post(`CustomerInfo`, colors);
        return result$;
    }

    DeleteConsumerInfo(id: number): Observable<any> {
        let result$ = this.delete(`CustomerInfo/${id}`);
        return result$;
    }
}
