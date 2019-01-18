import { Component, OnInit, OnDestroy, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";
import { Order, OrderService } from 'micro-dmz-oms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class OrderDetailComponent extends V1DetailEditorPageBase implements OnInit, AfterContentInit, OnDestroy {

  currentOrderId: string;
  detailPdfDownloadUrl: string;
  resource = 'Order';
  @ViewChild('detailViewCt') detailViewCt: ElementRef;
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: OrderService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngAfterContentInit(): void {
    this.interactSrv.afterDataRefresh$.subscribe((data: Order) => {
      if (!data) return;
      this.currentOrderId = data.id;
    });
  }//ngAfterContentInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy
}
