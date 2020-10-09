import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod } from '../Models/PaymentMethod';

@Injectable()
export class PaymentMethodsService extends BaseService {
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);
    }

    GetPaymentMethods(): Observable<any> {
        let result$ = this.get(`PaymentMethods/Get`);
        return result$;
    }
    // GetPaymentMethod(id: number): Observable<any> {
    //     let result$ = this.get(`PaymentMethods/${id}`);
    //     return result$;
    // }

    // ModifyPaymentMethod(id: number, PaymentMethod: PaymentMethod): Observable<any> {
    //     let result$ = this.put(`PaymentMethods/Update/${id}`, PaymentMethod);
    //     return result$;
    // }

    AddPaymentMethods(PaymentMethods: PaymentMethod[]): Observable<any> {
        let result$ = this.post(`PaymentMethods/Insert`, PaymentMethods);
        return result$;
    }

    DeletePaymentMethod(id: number): Observable<any> {
        let result$ = this.post(`PaymentMethods/Delete/${id}`, {});
        return result$;
    }
}