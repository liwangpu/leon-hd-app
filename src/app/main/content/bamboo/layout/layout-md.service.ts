import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { LayoutService } from '../../../toolkit/server/webapi/layout.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class LayoutMdService extends PaginatorLaunch  {

  createdUrl = 'app/layout-detail';
  titleIcon = 'account_balance';
  title = 'glossary.Layout';
  constructor(public apiSrv: LayoutService, protected datePipe: DatePipe) {
    super(datePipe);
  }//constructor

}
