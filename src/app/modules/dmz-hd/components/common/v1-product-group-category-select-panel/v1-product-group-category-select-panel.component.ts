import { Component, OnInit } from '@angular/core';
import { V1CategorySelectPanelBase } from '@geek/apps-base';
import { ProductGroupCategoryService } from '@geek/micro-dmz-hd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-common-v1-product-group-category-select-panel',
  template: `
  <app-common-v1-category-select-panel [categoryModel]='categoryModel' (nodeSelected)='onNodeSelected($event)'></app-common-v1-category-select-panel>
  `
})
export class V1ProductGroupCategorySelectPanelComponent extends V1CategorySelectPanelBase implements OnInit {

  constructor(protected categorySrv: ProductGroupCategoryService, protected tranSrv: TranslateService) {
    super(categorySrv, tranSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
