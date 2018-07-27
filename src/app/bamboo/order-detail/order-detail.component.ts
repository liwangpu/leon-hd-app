import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../share/services/webapis/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor(public apiSrv: OrderService) { }

  ngOnInit() {
  }

}
