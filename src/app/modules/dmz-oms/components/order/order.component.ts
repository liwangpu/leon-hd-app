import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from 'scaffold-app-core'; import { AsyncHandleService } from 'scaffold-app-minor';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { ICommonTableColumndef } from 'scaffold-page-plate';
import { OrderService, Order } from 'micro-dmz-oms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Order';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , {
      id: 'orderNo', name: 'glossary.OrderNo', width: 150, cell: (data: Order) => {
        return data.orderNo;
      }
    }
    , {
      id: 'totalNum', name: 'glossary.Quantity', width: 85, cell: (data: Order) => {
        return data.totalNum;
      }
    }
    , {
      id: 'totalPrice', name: 'glossary.TotalPrice', width: 85, cell: (data: Order) => {
        return data.totalPrice;
      }
    }
    , {
      id: 'workFlowItemName', name: 'glossary.OrderState', width: 150, cell: (data: Order) => {
        return data.workFlowItemName;
      }
    }
    , this._descriptionColumnDef
    , this._createdTime
  ];
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: OrderService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
