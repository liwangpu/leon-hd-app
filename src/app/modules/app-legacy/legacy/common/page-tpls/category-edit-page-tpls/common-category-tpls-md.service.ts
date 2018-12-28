import { Injectable } from '@angular/core';
import { CommonCategoryService } from '../../../services/webapis/common-category.service';
import { AssetCategory } from '../../../models/assetcategory';
import { Subject } from 'rxjs';

@Injectable()
export class CommonCategoryTplsMdService {

  apiSrv: CommonCategoryService;
  afterCategorySelect$ = new Subject<AssetCategory>();
  constructor() { }
}
