import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1CategoryEditorBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductGroupCategoryService } from 'micro-dmz-hd';

@Component({
  selector: 'app-product-group-category',
  templateUrl: './product-group-category.component.html',
  styleUrls: ['./product-group-category.component.scss']
})
export class ProductGroupCategoryComponent extends V1CategoryEditorBase implements OnInit, OnDestroy {

  resource = 'ProductGroupCategory';
  constructor(protected actr: ActivatedRoute, protected router: Router, public apiSrv: ProductGroupCategoryService) {
    super(actr, router, apiSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy() {
    super.ngOnDestroy();
  }//ngOnDestroy
}
