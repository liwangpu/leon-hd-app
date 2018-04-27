import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductCategoryService } from "../../../../toolkit/server/webapi/productcategory.service";
import { ProductCategory } from "../../../../toolkit/models/productcategory";
import { Subject } from 'rxjs';
@Component({
  selector: 'app-product-category-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit, OnDestroy {


  private categories: Array<ProductCategory> = [];
  private destroy$: Subject<boolean> = new Subject();
  constructor(private categorySrv: ProductCategoryService) {

  }

  ngOnInit() {
    // this.categorySrv.query({}).takeUntil(this.destroy$).subscribe(resCats => {
    //   this.categories = resCats;
    // });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
