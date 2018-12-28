import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewportService {

  outletMaximize$ = new BehaviorSubject<boolean>(true);
  constructor() { }
}
