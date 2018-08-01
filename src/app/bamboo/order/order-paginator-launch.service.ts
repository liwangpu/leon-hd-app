import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { OrderService } from '../../share/services/webapis/order.service';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';

@Injectable()
export class OrderPaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/order-detail';
  titleIcon = 'assignment';
  title = 'glossary.Order';
  constructor(public apiSrv: OrderService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService,protected dialogFac: DialogFactoryService) {
    super(datePipe, syncHandle,dialogFac);
  }//constructor

}
