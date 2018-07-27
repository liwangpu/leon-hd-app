import { Injectable } from '@angular/core';
import { CommonCategoryTplsMdService } from '../../share/common/page-tpls/category-edit-page-tpls/common-category-tpls-md.service';
import { ProductCategoryService } from '../../share/services/webapis/productcategory.service';

@Injectable()
export class ProductLeftCategoryLaunchService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: ProductCategoryService) {
    super();
  }
}
