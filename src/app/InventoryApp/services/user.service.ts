import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../Models/LoginRequest';
import { LoginResponse } from '../Models/LoginResponse';
import { map, tap } from 'rxjs/operators';

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

    Login(loginRequest: LoginRequest): Observable<any> {
        let result$ = this.post(`User/Login`, loginRequest)
            .pipe(
                tap((data: LoginResponse) => {
                    if (data.isAuthenticated) {
                        sessionStorage.setItem("Authorization", data.token);
                        localStorage.setItem("user", JSON.stringify(data))
                    }

                })
            )
        return result$;
    }
}
