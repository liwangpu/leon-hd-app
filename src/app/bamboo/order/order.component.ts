import { Component, OnInit } from '@angular/core';
import { OrderPaginatorLaunchService } from './order-paginator-launch.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderPaginatorLaunchService]
})
export class OrderComponent implements OnInit {


  constructor(public launch: OrderPaginatorLaunchService) { }

  ngOnInit() {
  }
}
