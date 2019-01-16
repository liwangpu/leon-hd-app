import { Injectable } from '@angular/core';
import { CommonCategoryTplsMdService, ProductgroupCategoryService } from '@app/app-legacy';

@Injectable()
export class ProductGroupLeftCategoryLaunchService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: ProductgroupCategoryService) {
    super();
  }
}
