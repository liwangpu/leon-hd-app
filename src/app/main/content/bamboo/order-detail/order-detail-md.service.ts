import { Injectable, OnDestroy } from '@angular/core';
import { Order } from "../../../toolkit/models/order";
import { OrderService } from "../../../toolkit/server/webapi/order.service";
import { Subject } from 'rxjs';
@Injectable()
export class OrderDetailMdService implements OnDestroy {


  currentOrder: Order;//当前操作的order
  afterOrderChange$: Subject<void> = new Subject();//订单更新后触发事件
  destroy$: Subject<boolean> = new Subject();
  constructor() {

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy
}
