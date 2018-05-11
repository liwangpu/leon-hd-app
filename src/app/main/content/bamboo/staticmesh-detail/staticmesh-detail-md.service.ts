import { Injectable } from '@angular/core';
import { StaticMesh } from '../../../toolkit/models/staticmesh';
import { Subject } from 'rxjs';

@Injectable()
export class StaticmeshDetailMdService {

  currentStaticMesh: StaticMesh;
  destroy$: Subject<void> = new Subject();
  afterEdit$: Subject<void> = new Subject();
  constructor() { }

}
