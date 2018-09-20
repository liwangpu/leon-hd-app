import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  _toggle$ = new Subject();
  _open$ = new Subject();
  constructor() { }

  toggle() {
    this._toggle$.next();
  }//toggle

  open() {
    this._open$.next();
  }//open
}
