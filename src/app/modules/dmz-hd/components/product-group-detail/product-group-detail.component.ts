import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from '@geek/apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import {  ProductGroupService } from '@geek/micro-dmz-hd';
import { DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { AsyncHandleService } from "@geek/scaffold-app-minor";

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrls: ['./product-group-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class ProductGroupDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'ProductGroup';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: ProductGroupService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}