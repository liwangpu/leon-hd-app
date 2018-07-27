import { Injectable } from '@angular/core';
import { CommonCategoryTplsMdService } from '../../share/common/page-tpls/category-edit-page-tpls/common-category-tpls-md.service';
import { ProductgroupCategoryService } from '../../share/services/webapis/productgroup-category.service';

@Injectable()
export class ProductGroupLeftCategoryLaunchService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: ProductgroupCategoryService) {
    super();
  }
}
