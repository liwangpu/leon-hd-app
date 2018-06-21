import { Injectable } from '@angular/core';
import { CommonCategoryTplsBase } from '../common/common-category-tpls/common-category-tpls.component';
import { MaterialCategoryService } from '../../../toolkit/server/webapi/material-category.service';

@Injectable()
export class MaterialCategoryMdService extends CommonCategoryTplsBase {

  constructor(public apiSrv:MaterialCategoryService) {
    super();
  }//constructor

}
