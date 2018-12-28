import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  _mqAlia$ = new BehaviorSubject<string>('xs');
  constructor() { }

  /**
   * 设备宽度改变
   * @param alia 
   */
  mqAliaChange(alia: string) {
    if (!alia) return;
    this._mqAlia$.next(alia);
  }//mqAliaChange
}
