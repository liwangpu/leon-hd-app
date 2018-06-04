import { Component, OnInit } from '@angular/core';
import { ProductMdService } from '../product-md.service';
@Component({
  selector: 'app-product-category-view-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  constructor(public mdSrv: ProductMdService) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  onCategorySelect(catId: string) {
    this.mdSrv.onSelectCategory.next(catId);
  }//onCategorySelect
}
