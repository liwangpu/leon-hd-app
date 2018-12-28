import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppSearchService {

  protected _keyword: string;
  search$ = new Subject<string>();
  closeSearch$ = new Subject();
  constructor() { }

  set keyword(vl: string) {
    this._keyword = vl;
    this.search$.next(vl);
  }

  closeSearch() {
    this.closeSearch$.next();
  }//closeSearch

}
