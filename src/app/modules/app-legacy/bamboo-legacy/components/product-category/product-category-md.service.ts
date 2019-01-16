import { Injectable } from '@angular/core';
import { CommonCategoryTplsBase } from '@app/app-legacy';
import { ProductCategoryService } from '@app/app-legacy';
// import { CommonCategoryTplsBase } from '../../share/common/page-tpls/category-edit-page-tpls/category-edit-refers';
// import { ProductCategoryService } from '../../share/services/webapis/productcategory.service';

@Injectable()
export class ProductCategoryMdService extends CommonCategoryTplsBase {

  constructor(public apiSrv: ProductCategoryService) {
    super();
  }//constructor

}
