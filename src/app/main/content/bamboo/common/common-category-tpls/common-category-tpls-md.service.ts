import { Injectable } from '@angular/core';
import { CommonCategoryService } from '../../../../toolkit/server/webapi/common-category.service';

@Injectable()
export class CommonCategoryTplsMdService {

  apiSrv: CommonCategoryService;
  constructor() { }

}
