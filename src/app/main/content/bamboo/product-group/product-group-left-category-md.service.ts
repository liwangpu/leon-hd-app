import { Injectable } from '@angular/core';
import { CommonCategoryTplsMdService } from '../common/common-category-tpls/common-category-tpls-md.service';
import { ProductgroupCategoryService } from '../../../toolkit/server/webapi/productgroup-category.service';

@Injectable()
export class ProductGroupLeftCategoryMdService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: ProductgroupCategoryService) {
    super();
  }

}
