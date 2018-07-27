import { Injectable } from '@angular/core';
import { MaterialCategoryService } from '../../share/services/webapis/material-category.service';
import { CommonCategoryTplsMdService } from '../../share/common/page-tpls/category-edit-page-tpls/common-category-tpls-md.service';

@Injectable()
export class MaterialLeftCategoryLaunchService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: MaterialCategoryService) {
    super();
  }
}
