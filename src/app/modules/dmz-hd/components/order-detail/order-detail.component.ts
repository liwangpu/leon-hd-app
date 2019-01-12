import { Component, OnInit, OnDestroy, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService, Order } from 'micro-dmz-hd';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";
import { FormControl } from '@angular/forms';
import { AppConfigService } from '../../../../app-config.service';

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
  orderStateCt = new FormControl({ value: '', disabled: true });
  orderNoCt = new FormControl({ value: '', disabled: true });
  @ViewChild('detailViewCt') detailViewCt: ElementRef;
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: OrderService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected appConfigSrv: AppConfigService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
    this.interactSrv.basicExDataChange$.subscribe((data: Order) => {
      if (!data) return;

      if (data.workFlowItemName)
        this.orderStateCt.patchValue(data.workFlowItemName);
    });
  }//ngOnInit

  ngAfterContentInit(): void {
    this.interactSrv.afterDataRefresh$.subscribe((data: Order) => {
      if (!data) return;
      this.currentOrderId = data.id;
      this.orderStateCt.patchValue(data.workFlowItemName);
      this.orderNoCt.patchValue(data.orderNo);
    });
  }//ngAfterContentInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  viewDetailPage() {
    let detailViewUrl = `${this.appConfigSrv.appConfig.toolServer}/dmz-oms/order-detail?order=${this.currentOrderId}`;
    detailViewUrl = detailViewUrl.replace(/\/\//g, '/');
    detailViewUrl = detailViewUrl.replace('http:/', 'http://');
    detailViewUrl = detailViewUrl.replace('https:/', 'https://');
    window.open(detailViewUrl);
  }//viewDetailPage
}
