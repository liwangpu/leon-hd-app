import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DessertService } from '../../services/dessert.service';
import { MaterialCategoryService } from '../../../toolkit/server/webapi/material-category.service';
import { MaterialCategory } from '../../../toolkit/models/material-category';

@Injectable()
export class CategoryMdService implements OnDestroy {


  destroy$: Subject<boolean> = new Subject();
  productCategories: Array<MaterialCategory> = [];//扁平结构的产品分类信息
  afterCategorySelect$: Subject<MaterialCategory> = new Subject();
  afterCategoryChange$: Subject<MaterialCategory> = new Subject();
  constructor(private categorySrv: MaterialCategoryService, private dessertSrv: DessertService) {

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * 获取扁平结构的产品分类信息并存储
   */
  getAndCacheFlatProductCategories() {
    this.categorySrv.getAllFlatMaterialCategory(this.dessertSrv.organId).takeUntil(this.destroy$).subscribe(resCates => {
      for (let idx = resCates.length - 1; idx >= 0; idx--) {
        if (!resCates[idx].parentId) {
          resCates[idx].name = '主分类';
        }
      }
      this.productCategories = resCates;
    });
  }//getAndCacheFlatProductCategories
}
