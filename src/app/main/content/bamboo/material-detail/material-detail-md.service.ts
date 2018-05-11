import { Injectable } from '@angular/core';
import { Material } from '../../../toolkit/models/material';
import { Subject } from 'rxjs';

@Injectable()
export class MaterialDetailMdService {

  currentMaterial: Material;
  destroy$: Subject<void> = new Subject();
  afterEdit$: Subject<void> = new Subject();
  constructor() { }

}
