import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PackageDetailMdService {

  afterAreaSelected$ = new BehaviorSubject<string>('');
  constructor() { }
}
