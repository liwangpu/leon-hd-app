import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { V1CategoryEditorBase } from 'apps-base';
import { PanelAssemblyCategoryService } from 'micro-dmz-hd';

@Component({
  selector: 'app-production-category-panelassembly',
  templateUrl: './production-category-panelassembly.component.html',
  styleUrls: ['./production-category-panelassembly.component.scss']
})
export class ProductionCategoryPanelassemblyComponent extends V1CategoryEditorBase implements OnInit, OnDestroy {

  resource = 'PanelAssemblyCategory';
  constructor(protected actr: ActivatedRoute, protected router: Router, public apiSrv: PanelAssemblyCategoryService) {
    super(actr, router, apiSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy() {
    super.ngOnDestroy();
  }//ngOnDestroy

}
