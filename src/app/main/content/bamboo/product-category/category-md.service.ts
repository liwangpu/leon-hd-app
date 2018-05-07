import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductCategory } from '../../../toolkit/models/productcategory';
import { ProductCategoryService } from '../../../toolkit/server/webapi/productcategory.service';
import { DessertService } from '../../services/dessert.service';

@Injectable()
export class CategoryMdService implements OnDestroy {


  destroy$: Subject<boolean> = new Subject();
  productCategories: Array<ProductCategory> = [];//扁平结构的产品分类信息
  afterCategorySelect$: Subject<ProductCategory> = new Subject();
  afterCategoryChange$: Subject<ProductCategory> = new Subject();
  constructor(private categorySrv: ProductCategoryService, private dessertSrv: DessertService) {

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * 获取扁平结构的产品分类信息并存储
   */
  getAndCacheFlatProductCategories() {
    this.categorySrv.getAllFlatProductCategory(this.dessertSrv.organId).takeUntil(this.destroy$).subscribe(resCates => {
      for (let idx = resCates.length - 1; idx >= 0; idx--) {
        if (!resCates[idx].parentId) {
          resCates[idx].name = '主分类';
        }
      }
      this.productCategories = resCates;
    });
  }//getAndCacheFlatProductCategories
}
