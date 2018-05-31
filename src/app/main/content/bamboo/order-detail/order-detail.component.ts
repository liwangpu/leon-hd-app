import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../../../toolkit/server/webapi/order.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  constructor(public apiSrv: OrderService) {

  }//constructor

  ngOnInit() {
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy
}
