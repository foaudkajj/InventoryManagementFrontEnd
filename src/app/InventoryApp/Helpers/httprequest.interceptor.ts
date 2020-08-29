import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var headers = request.headers
            .set(
                "Authorization",
                "Bearer " + sessionStorage.getItem("Authorization")
            );
        const authReq = request.clone({ headers: headers });
        return next.handle(authReq).pipe(
            catchError(error => {
                console.log(error)
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.router.navigate(["login"]);
                } else {
                    let errorResponse = {
                        message: "",
                        exceptionMessage: "",
                        exceptionType: "",
                        stackTrace: ""
                    };

                    console.log(errorResponse)

                    // <b>${this.translate.instant("Error_Messages.STACK_TRACE")}:</b> ${errorResponse.stackTrace}
                }
                return throwError(error);
            }));

    }
}