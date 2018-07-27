import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationResponse } from '../../models/validation-response';
import { _throw } from 'rxjs/observable/throw';
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

        console.log('ErrorInterceptor catch error:', handle);
        if (typeof (handle.error) === 'string') {
            //delete|post|put 在responseType: 'text' 请求返回的error是ValidationResponse格式的字符串,需要转换json
            try {
                let obj = JSON.parse(handle.error) as ValidationResponse;
                if (obj.errors) {
                    let msg = '';
                    for (let idx = obj.errors.length - 1; idx >= 0; idx--) {
                        let curError = obj.errors[idx];
                        if (msg !== '')
                            msg += `,${curError.field}:${curError.message}`;
                        else
                            msg += `${curError.field}:${curError.message}`;
                    }
                    errorMsg = msg;
                }
                else
                    errorMsg = obj.message;
            }
            catch (err) {
                errorMsg = err;
            }
        }
        else {
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
        }
        return _throw(errorMsg) ;
    }
}