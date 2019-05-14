import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { V1CategoryEditorBase } from 'apps-base';
import { PanelComponentCategoryService } from 'micro-dmz-hd';

@Component({
  selector: 'app-production-category-panelcomponent',
  templateUrl: './production-category-panelcomponent.component.html',
  styleUrls: ['./production-category-panelcomponent.component.scss']
})
export class ProductionCategoryPanelcomponentComponent extends V1CategoryEditorBase implements OnInit, OnDestroy {

  resource = 'PanelComponentCategory';
  constructor(protected actr: ActivatedRoute, protected router: Router, public apiSrv: PanelComponentCategoryService) {
    super(actr, router, apiSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy() {
    super.ngOnDestroy();
  }//ngOnDestroy

}
