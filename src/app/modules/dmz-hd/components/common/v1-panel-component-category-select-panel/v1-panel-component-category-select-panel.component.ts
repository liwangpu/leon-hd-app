import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PanelComponentCategoryService } from 'micro-dmz-hd';
import { V1CategorySelectPanelBase } from 'apps-base';

@Component({
  selector: 'app-common-v1-panel-component-category-select-panel',
  template: `
  <app-common-v1-category-select-panel [settings]='settings' [categoryModel]='categoryModel' (nodeSelected)='onNodeSelected($event)'></app-common-v1-category-select-panel>
  `
})
export class V1PanelComponentCategorySelectPanelComponent extends V1CategorySelectPanelBase implements OnInit {

  settings = {
    static: true,
    rightMenu: false,
    leftMenu: false,
    rootIsVisible: true
  };
  constructor(protected categorySrv: PanelComponentCategoryService, protected tranSrv: TranslateService) {
    super(categorySrv, tranSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
