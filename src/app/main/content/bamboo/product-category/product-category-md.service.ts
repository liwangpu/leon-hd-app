import { Injectable } from '@angular/core';
import { CommonCategoryTplsBase } from '../common/common-category-tpls/common-category-tpls.component';
import { ProductCategoryService } from '../../../toolkit/server/webapi/productcategory.service';

@Injectable()
export class ProductCategoryMdService extends CommonCategoryTplsBase {

  constructor(public apiSrv:ProductCategoryService) {
    super();
  }//constructor

}
