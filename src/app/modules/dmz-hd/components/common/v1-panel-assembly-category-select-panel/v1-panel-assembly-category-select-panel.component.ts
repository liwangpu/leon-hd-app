import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PanelAssemblyCategoryService } from 'micro-dmz-hd';
import { V1CategorySelectPanelBase } from 'apps-base';

@Component({
  selector: 'app-common-v1-panel-assembly-category-select-panel',
  template: `
  <app-common-v1-category-select-panel [categoryModel]='categoryModel' (nodeSelected)='onNodeSelected($event)'></app-common-v1-category-select-panel>
  `
})
export class V1PanelAssemblyCategorySelectPanelComponent extends V1CategorySelectPanelBase implements OnInit {

  constructor(protected categorySrv: PanelAssemblyCategoryService, protected tranSrv: TranslateService) {
    super(categorySrv, tranSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
