import { Injectable } from '@angular/core';
import { CommonCategoryTplsBase } from '../common/common-category-tpls/common-category-tpls.component';
import { ProductgroupCategoryService } from '../../../toolkit/server/webapi/productgroup-category.service';

@Injectable()
export class ProductgroupCategoryMdService extends CommonCategoryTplsBase {

  constructor(public apiSrv:ProductgroupCategoryService) {
    super();
  }//constructor

}
