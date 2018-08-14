import { Injectable } from '@angular/core';
import { MapService } from '../../share/services/webapis/map.service';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { PaginatorLaunch, IListableRecordMenu } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';
import { Map } from '../../share/models/map';

@Injectable()
export class MapPaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/map-detail';
  titleIcon = 'map';
  title = 'glossary.Map';
  itemManageMenu: IListableRecordMenu = {
    items: [
      { icon: 'account_balance', name: 'button.GenerateLayout', click: (data: Map) => { this.transToLayout(data); } }
    ]
  };
  constructor(public apiSrv: MapService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService, protected dialogFac: DialogFactoryService) {
    super(datePipe, syncHandle, dialogFac);
  }//constructor

  /**
   * 地图转户型
   * @param data 
   */
  transToLayout(data: Map) {
    let source$ = this.apiSrv.transToLayout(data.id);
    this.syncHandle.asyncRequest(source$).subscribe();
  }//transToLayout
}
