import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../Models/LoginRequest';
import { LoginResponse } from '../Models/LoginResponse';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    // private currentUserSubject: BehaviorSubject<LoginResponse>;
    // public currentUser: Observable<LoginResponse>;
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);

    }

    // public get currentUserValue(): LoginResponse {
    //     return this.currentUserSubject.value;
    // }

    //   GetProducts(): Observable<any> {
    //     let result$ = this.get(`Products`);
    //     return result$;
    //   }
    //   GetProduct(id: number): Observable<any> {
    //     let result$ = this.get(`Products/${id}`);
    //     return result$;
    //   }

    //   ModifyProduct(id: number, Product: Product): Observable<any> {
    //     let result$ = this.put(`Products/${id}`, Product);
    //     return result$;
    //   }

    Login(loginRequest: LoginRequest): Observable<any> {
        let result$ = this.post(`User/Login`, loginRequest)
        // .pipe(map((loginResponse: LoginResponse) => {
        //     console.log(loginResponse)
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     sessionStorage.setItem('Authorization', loginResponse.token);
        //     this.currentUserSubject = new BehaviorSubject<LoginResponse>(loginResponse);
        //     this.currentUser = this.currentUserSubject.asObservable();
        //     this.currentUserSubject.next(loginResponse);
        //     return loginResponse;
        // }));
        return result$;
    }

    //   DeleteProduct(id: number): Observable<any> {
    //     let result$ = this.delete(`Products/${id}`);
    //     return result$;
    //   }
}
