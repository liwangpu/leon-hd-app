import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'micro-dmz-hd';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class ProductDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'Product';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: ProductService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
