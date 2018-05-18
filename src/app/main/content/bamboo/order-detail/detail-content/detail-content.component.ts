import { Component, OnInit } from '@angular/core';
import { OrderDetailMdService } from '../order-detail-md.service';
import { Order } from "../../../../toolkit/models/order";
import { OrderContent } from "../../../../toolkit/models/order-content";
import { OrderContentItem } from "../../../../toolkit/models/order-content-item";
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-order-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.scss']
})
export class DetailContentComponent implements OnInit {
  displayedColumns = ['productName', 'productSpecName', 'unitPrice', 'num', 'totalPrice'];
  dataSource: MatTableDataSource<OrderContentItem>;
  orderContent: OrderContent;
  constructor(private detaiMdSrv: OrderDetailMdService) {

  }

  ngOnInit() {
    this.orderContent = this.detaiMdSrv.currentOrder.contentIns ? this.detaiMdSrv.currentOrder.contentIns : new OrderContent();
    let items = this.orderContent.items ? this.orderContent.items : [];
    this.dataSource = new MatTableDataSource(items);
  }//ngOnInit

}

