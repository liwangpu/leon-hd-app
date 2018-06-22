import { Injectable } from '@angular/core';
import { CommonCategoryTplsMdService } from '../common/common-category-tpls/common-category-tpls-md.service';
import { ProductCategoryService } from '../../../toolkit/server/webapi/productcategory.service';

@Injectable()
export class ProductLeftCategoryMdService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: ProductCategoryService) {
    super();
  }

}
