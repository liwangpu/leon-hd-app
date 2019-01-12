import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1CategoryEditorBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from 'micro-dmz-hd';


@Component({
  selector: 'app-production-category',
  templateUrl: './production-category.component.html',
  styleUrls: ['./production-category.component.scss']
})
export class ProductionCategoryComponent extends V1CategoryEditorBase implements OnInit, OnDestroy {

  resource = 'ProductCategory';
  constructor(protected actr: ActivatedRoute, protected router: Router, public apiSrv: ProductCategoryService) {
    super(actr, router, apiSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy() {
    super.ngOnDestroy();
  }//ngOnDestroy

}
