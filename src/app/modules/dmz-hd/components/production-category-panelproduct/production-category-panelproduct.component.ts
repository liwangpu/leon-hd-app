import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1CategoryEditorBase } from 'apps-base';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelCategoryService } from 'micro-dmz-hd';

@Component({
  selector: 'app-production-category-panelproduct',
  templateUrl: './production-category-panelproduct.component.html',
  styleUrls: ['./production-category-panelproduct.component.scss']
})
export class ProductionCategoryPanelproductComponent extends V1CategoryEditorBase implements OnInit, OnDestroy {

  resource = 'PanelProductCategory';
  constructor(protected actr: ActivatedRoute, protected router: Router, public apiSrv: PanelCategoryService) {
    super(actr, router, apiSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy() {
    super.ngOnDestroy();
  }//ngOnDestroy

}
