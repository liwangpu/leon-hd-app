import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {  PanelCategoryService } from 'micro-dmz-hd';
import { V1CategorySelectPanelBase } from 'apps-base';

@Component({
  selector: 'app-common-v1-panel-category-select-panel',
  template:`
  <app-common-v1-category-select-panel [categoryModel]='categoryModel' (nodeSelected)='onNodeSelected($event)'></app-common-v1-category-select-panel>
  `
})
export class V1PanelCategorySelectPanelComponent extends V1CategorySelectPanelBase implements OnInit {

  constructor(protected categorySrv: PanelCategoryService, protected tranSrv: TranslateService) {
    super(categorySrv, tranSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
