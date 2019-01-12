import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppProgressService {

  previousValue = false;
  showProgress$ = new BehaviorSubject<boolean>(false);
  constructor() { }

  set showProgress(show: boolean) {
    var currentValue = show ? true : false;
    if (this.previousValue == currentValue) return;
    setTimeout(() => {
      this.showProgress$.next(currentValue);
    }, 300);
    this.previousValue = currentValue;
  }//showProgress
}
