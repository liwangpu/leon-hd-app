import { Injectable } from '@angular/core';
import { Subject } from '../../../../../node_modules/rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalSearchService {

  onKeyup$ = new Subject<string>();
  constructor() { }
}
