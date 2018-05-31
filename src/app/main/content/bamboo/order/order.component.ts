import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderMdService } from "./order-md.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderMdService]
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(public mdSrv: OrderMdService) { }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

}
