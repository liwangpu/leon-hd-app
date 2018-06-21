import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../toolkit/common/services/snackbar.service';
import { Observable } from 'rxjs';
import { from } from "rxjs/observable/from";
import { of } from "rxjs/observable/of";
import { map, concatMap, catchError, tap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operator/mergeMap';

@Injectable()
export class AsyncHandleService {

  constructor(private tranSrv: TranslateService, private snackbarSrv: SnackbarService) { }

  asyncRequest(source$: Observable<any>): Observable<any> {

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

    return source$.pipe(concatMap(val => from(trans({ k: 'message.SaveSuccessfully' }, val)))).
      pipe(catchError(err => {
        console.log('caaaaaaa', err)
        return from(trans({ k: 'message.OperationError', v: { value: err } }, {}, true));
      }));

    // return source$.pipe(concatMap(val => from(trans({ k: 'message.SaveSuccessfully' }, val)))).
    //   pipe(catchError(err => from(trans({ k: 'message.OperationError', v: { value: err } }, {}, true))));
  }//asyncRequest

}
