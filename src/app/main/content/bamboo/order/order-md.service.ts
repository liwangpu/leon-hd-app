import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { OrderService } from '../../../toolkit/server/webapi/order.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class OrderMdService extends PaginatorLaunch  {

  createdUrl = 'app/order-detail';
  titleIcon = 'assignment';
  title = 'glossary.Order';
  constructor(public apiSrv: OrderService, protected datePipe: DatePipe) {
    super(datePipe);
  }//constructor

}
