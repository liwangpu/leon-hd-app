import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from './snackbar.service';
import { Observable, from } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AsyncHandleService {

  constructor(private tranSrv: TranslateService, private snackbarSrv: SnackbarService) { }

  asyncRequest(source$: Observable<any>, ignoreSuccessMsg?: boolean): Observable<any> {

    let trans = (obj: { k: string, v?: any }, data: any, error?: boolean) => {
      return new Promise((resolve, reject) => {
        this.tranSrv.get(obj.k, obj.v).subscribe(msg => {
          this.snackbarSrv.simpleBar(msg);
          if (!error)
            resolve(data);
          else
            reject(obj.v);
        });
      });//promise
    };

    if (ignoreSuccessMsg)
      return source$.pipe(catchError(err => {
        return from(trans({ k: 'message.OperationError', v: { value: err } }, {}, true));
      }));


    return source$.pipe(concatMap(val => from(trans({ k: 'message.SaveSuccessfully' }, val)))).
      pipe(catchError(err => {
        return from(trans({ k: 'message.OperationError', v: { value: err } }, {}, true));
      }));
  }//asyncRequest
}
