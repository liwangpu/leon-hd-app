import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor() {

  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // return next.handle(req).pipe(catchError(this.handleError));
    return next.handle(req);
  }

}
