import { Injectable } from '@angular/core';
import { ProductService } from '../../../../../toolkit/server/webapi/product.service';
import { CommonIconListComponentBase } from '../../../common/common-icon-list/common-icon-list.component';

@Injectable()
export class GroupListReplacegroupMapsDialogMdService extends CommonIconListComponentBase {
  ;
  multipleSelect = true;
  constructor(public apiSrv: ProductService) {
    super();
  }//constructor

}