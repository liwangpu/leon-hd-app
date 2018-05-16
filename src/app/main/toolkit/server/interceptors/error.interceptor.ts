import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
/**
 * 用户Error Interceptor
 * 用于向WeApi请求Header中添加Authorization Token信息
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(this.handleError));
    }


    handleError(handle: HttpErrorResponse) {
        let errorMsg = '';
        if (handle.error instanceof ErrorEvent) {
            errorMsg = handle.error.message;
        } else {
            if (handle.error.errors && handle.error.errors.length) {
                let msg = '';
                for (let idx = handle.error.errors.length - 1; idx >= 0; idx--) {
                    let curError = handle.error.errors[idx];
                    if (msg !== '')
                        msg += `,${curError.field}:${curError.message}`;
                    else
                        msg += `${curError.field}:${curError.message}`;
                }
                errorMsg = msg;
            }
            else {
                errorMsg = handle.error.message;
            }

        }
        return Observable.throw(errorMsg);
    }
}