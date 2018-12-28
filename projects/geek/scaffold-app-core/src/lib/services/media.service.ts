import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MediaService {

  mqAlia$ = new BehaviorSubject<string>('xs');
  constructor() { }

  /**
   * 设备宽度改变
   * @param alia 
   */
  mqAliaChange(alia: string) {
    if (!alia) return;
    this.mqAlia$.next(alia);
  }//mqAliaChange
}
