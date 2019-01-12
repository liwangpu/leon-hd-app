import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DrawerService {

  toggle$ = new Subject();
  open$ = new Subject();
  constructor() { }

  toggle() {
    this.toggle$.next();
  }//toggle

  open() {
    this.open$.next();
  }//open
}
