import { Injectable } from '@angular/core';
import { CommonCategoryTplsBase } from '../../share/common/page-tpls/category-edit-page-tpls/category-edit-refers';
import { MaterialCategoryService } from '../../share/services/webapis/material-category.service';

@Injectable()
export class MaterialCategoryMdService extends CommonCategoryTplsBase {

  constructor(public apiSrv: MaterialCategoryService) {
    super();
  }//constructor

}
