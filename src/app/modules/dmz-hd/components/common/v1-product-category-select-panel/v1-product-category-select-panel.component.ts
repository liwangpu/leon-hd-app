import { Component, OnInit } from '@angular/core';
import { V1CategorySelectPanelBase } from 'apps-base';
import { TranslateService } from '@ngx-translate/core';
import { ProductCategoryService } from 'micro-dmz-hd';

@Component({
  selector: 'app-common-v1-product-category-select-panel',
  template: `
  <app-common-v1-category-select-panel [categoryModel]='categoryModel' (nodeSelected)='onNodeSelected($event)'></app-common-v1-category-select-panel>
  `
})
export class V1ProductCategorySelectPanelComponent extends V1CategorySelectPanelBase implements OnInit {

  constructor(protected categorySrv: ProductCategoryService, protected tranSrv: TranslateService) {
    super(categorySrv, tranSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
