import { Injectable } from '@angular/core';
import { CommonIconListComponentBase } from '../../../common/common-icon-list/common-icon-list.component';
import { MaterialService } from '../../../../../toolkit/server/webapi/material.service';

@Injectable()
export class GroupListMaterialMapsDialogMdService extends CommonIconListComponentBase {
  ;

  constructor(public apiSrv: MaterialService) {
    super();
  }//constructor

}
