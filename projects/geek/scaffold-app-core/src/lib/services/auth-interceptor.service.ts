import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppCacheService } from './app-cache.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let token = AppCacheService.getInstance().token;
    if (token) {
      let secureHeaders = req.headers;
      secureHeaders = secureHeaders.append('Authorization', `bearer ${token}`);
      const secureReq = req.clone({ headers: secureHeaders });
      return next.handle(secureReq);
    }
    return next.handle(req);
  }
}

