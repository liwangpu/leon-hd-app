import { Injectable } from '@angular/core';
import { CommonCategoryTplsBase } from '@app/app-legacy';
import { ProductgroupCategoryService } from '@app/app-legacy';
// import { CommonCategoryTplsBase } from '../../share/common/page-tpls/category-edit-page-tpls/category-edit-refers';
// import { ProductgroupCategoryService } from '../../share/services/webapis/productgroup-category.service';

@Injectable()
export class ProductGroupCategoryMdService extends CommonCategoryTplsBase {

  constructor(public apiSrv: ProductgroupCategoryService) {
    super();
  }//constructor

}
