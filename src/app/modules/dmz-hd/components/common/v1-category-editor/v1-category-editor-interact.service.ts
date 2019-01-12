import { Injectable } from '@angular/core';
import { AssetCategory } from 'micro-dmz-hd';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class V1CategoryEditorInteractService {

  categories$ = new BehaviorSubject<Array<AssetCategory>>([]);
  constructor() { }
}
