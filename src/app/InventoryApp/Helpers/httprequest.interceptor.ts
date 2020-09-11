import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SwalService } from '../services/Swal.Service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private router: Router, private swalService: SwalService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var headers = request.headers
            .set(
                "Authorization",
                "Bearer " + sessionStorage.getItem("Authorization")
            );
        const authReq = request.clone({ headers: headers });
        return next.handle(authReq).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.router.navigate(["login"]);
                } else {
                    if (error.error) {
                        this.swalService.showErrorMessage(error.error.Message);
                    } else {
                        this.swalService.showErrorMessage(error.message);
                    }
                }
                return throwError(error);
            }));

    }
}