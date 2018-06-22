import { Injectable } from '@angular/core';
import { CommonCategoryTplsMdService } from '../common/common-category-tpls/common-category-tpls-md.service';
import { MaterialCategoryService } from '../../../toolkit/server/webapi/material-category.service';

@Injectable()
export class MaterialLeftCategoryMdService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: MaterialCategoryService) {
    super();
  }

}