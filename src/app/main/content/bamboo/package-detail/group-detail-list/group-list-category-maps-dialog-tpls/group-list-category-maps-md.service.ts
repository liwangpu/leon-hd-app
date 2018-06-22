import { Injectable } from '@angular/core';
import { CommonIconListComponentBase } from '../../../common/common-icon-list/common-icon-list.component';
import { ProductService } from '../../../../../toolkit/server/webapi/product.service';

@Injectable()
export class GroupListCategoryMapsMdService extends CommonIconListComponentBase {

  constructor(public apiSrv: ProductService) {
    super();
  }//constructor

}

