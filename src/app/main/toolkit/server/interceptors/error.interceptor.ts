import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { finalize, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
/**
 * 用户Error Interceptor
 * 用于向WeApi请求Header中添加Authorization Token信息
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;
        return next.handle(req).pipe(catchError(this.handleError));
    }


    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.error(
            //     `Backend returned code ${error.status}, ` +
            //     `body was: ${error.error}`);
        }
        return Observable.throw(error);
    }
}