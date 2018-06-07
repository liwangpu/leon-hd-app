import { Component, OnInit, forwardRef } from '@angular/core';
import { CategoryNavExtend } from '../../common/paginator-left-category-common-tpls/paginator-left-category-common-tpls.component';

@Component({
  selector: 'app-product-category-left-nav',
  templateUrl: './category-left-nav.component.html',
  styleUrls: ['./category-left-nav.component.scss'],
  providers: [{ provide: CategoryNavExtend, useExisting: forwardRef(() => CategoryLeftNavComponent) }]
})
export class CategoryLeftNavComponent extends CategoryNavExtend implements OnInit {

  categoryName = 'glossary.Category';
  constructor() {
    super();
  }

  ngOnInit() {
  }

  onCategorySelect(cateid: string) {
    this.afterCategorySelected$.next(cateid);
  }//onCategorySelect

}
