import { Injectable } from '@angular/core';
import { CommonCategoryService } from '../../../../toolkit/server/webapi/common-category.service';
import { Subject } from 'rxjs/Subject';
import { AssetCategory } from '../../../../toolkit/models/assetcategory';

@Injectable()
export class CommonCategoryTplsMdService {

  apiSrv: CommonCategoryService;
  afterCategorySelect$: Subject<AssetCategory> = new Subject();
  constructor() { }

}
