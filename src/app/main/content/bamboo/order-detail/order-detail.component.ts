import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailMdService } from './order-detail-md.service';
import { Order } from '../../../toolkit/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailMdService]
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  order: Order = new Order();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private orderMdSrv: OrderDetailMdService) {
    this.orderMdSrv.currentOrder = this.route.snapshot.data.entity;

    this.orderMdSrv.afterOrderChange$.takeUntil(this.destroy$).subscribe(() => {
      this.order = this.orderMdSrv.currentOrder;
    });

    this.orderMdSrv.afterOrderChange$.next();
  }//constructor

  ngOnInit() {
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy
}
