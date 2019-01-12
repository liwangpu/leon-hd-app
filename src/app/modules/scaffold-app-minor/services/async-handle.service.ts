import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from './snackbar.service';
import { Observable, from } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { AppProgressService } from 'scaffold-app-core';

@Injectable()
export class AsyncHandleService {

  constructor(private tranSrv: TranslateService, private snackbarSrv: SnackbarService, protected progressSrv: AppProgressService) { }

  asyncRequest(source$: Observable<any>, ignoreSuccessMsg?: boolean, manualHandleError?: (error: any) => string): Observable<any> {

    this.progressSrv.showProgress = true;
    let trans = (obj: { k: string, v?: any }, data: any, error?: boolean) => {
      return new Promise((resolve, reject) => {
        this.tranSrv.get(obj.k, obj.v).subscribe(msg => {
          this.snackbarSrv.simpleBar(msg);
          this.progressSrv.showProgress = false;
          if (!error)
            resolve(data);
          else
            reject(obj.v);
        });
      });//promise
    };

    if (ignoreSuccessMsg)
      return source$.pipe(catchError(err => {
        if (manualHandleError)
          err = manualHandleError(err);
        return from(trans({ k: 'message.OperationError', v: { value: err } }, {}, true));
      })).pipe(tap(x => {
        this.progressSrv.showProgress = false;
      }));

    return source$.pipe(concatMap(val => from(trans({ k: 'message.OperateSuccessfully' }, val)))).
      pipe(catchError(err => {
        if (manualHandleError)
          err = manualHandleError(err);
        return from(trans({ k: 'message.OperationError', v: { value: err } }, {}, true));
      })).pipe(tap(x => {
        this.progressSrv.showProgress = false;
      }));
  }//asyncRequest
}
