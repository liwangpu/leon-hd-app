import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1CategoryEditorBase } from '@geek/apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialCategoryService } from '@geek/micro-dmz-hd';

@Component({
  selector: 'app-material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.scss']
})
export class MaterialCategoryComponent extends V1CategoryEditorBase implements OnInit, OnDestroy {

  resource = 'MaterialCategory';
  constructor(protected actr: ActivatedRoute, protected router: Router, public apiSrv: MaterialCategoryService) {
    super(actr, router, apiSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy() {
    super.ngOnDestroy();
  }//ngOnDestroy
}
