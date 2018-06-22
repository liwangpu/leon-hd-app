import { Injectable } from '@angular/core';
import { CommonIconListComponentBase } from '../../../common/common-icon-list/common-icon-list.component';
import { ProductGroupService } from '../../../../../toolkit/server/webapi/product-group.service';

@Injectable()
export class GroupListGroupMapsDialogMdService extends CommonIconListComponentBase {

  constructor(public apiSrv: ProductGroupService) {
    super();
  }//constructor

}
