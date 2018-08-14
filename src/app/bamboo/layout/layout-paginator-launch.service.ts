import { Injectable } from '@angular/core';
import { LayoutService } from '../../share/services/webapis/layout.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';
import { PaginatorLaunch } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';

@Injectable()
export class LayoutPaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/layout-detail';
  titleIcon = 'account_balance';
  title = 'glossary.Layout';
  constructor(public apiSrv: LayoutService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService, protected dialogFac: DialogFactoryService) {
    super(datePipe, syncHandle, dialogFac);
  }//constructor
}
