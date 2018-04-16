import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { finalize, tap } from 'rxjs/operators';
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
        return next.handle(req).pipe(tap(event => ok = event instanceof HttpResponse ? 'succeeded' : '', error => ok = 'failed'), finalize(() => {
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}"
            ${ok} in ${elapsed} ms.`;

            if (ok === 'failed') {
                console.log(999, `you app http request get an error ${msg}`);
            }
        }));
    }
}