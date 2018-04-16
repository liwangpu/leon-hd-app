import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
/**
 * 用户Token Interceptor
 * 用于向WeApi请求Header中添加Authorization Token信息
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        let token = localStorage.getItem("token");
        if (token) {
            let secureHeaders = req.headers;
            secureHeaders = secureHeaders.append('Authorization', `bearer ${token}`);
            const secureReq = req.clone({ headers: secureHeaders });
            return next.handle(secureReq);
        }
        return next.handle(req);
    }
}