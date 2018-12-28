import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MaterialCategoryService } from '@geek/micro-dmz-hd';
import { V1CategorySelectPanelBase } from '@geek/apps-base';

@Component({
  selector: 'app-common-v1-material-category-select-panel',
  template:`
  <app-common-v1-category-select-panel [categoryModel]='categoryModel' (nodeSelected)='onNodeSelected($event)'></app-common-v1-category-select-panel>
  `
})
export class V1MaterialCategorySelectPanelComponent extends V1CategorySelectPanelBase implements OnInit {

  constructor(protected categorySrv: MaterialCategoryService, protected tranSrv: TranslateService) {
    super(categorySrv, tranSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
