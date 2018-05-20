import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ISimpleConfirm } from '../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { ProductService } from '../../../toolkit/server/webapi/product.service';
import { SnackbarService } from '../../../toolkit/common/services/snackbar.service';

@Component({
  selector: 'app-change-category',
  template: `
  <app-product-category-select-panel (onCategorySelect)='onCategorySelect($event)'></app-product-category-select-panel>
  `
})
export class ChangeCategoryComponent implements OnInit, OnDestroy, ISimpleConfirm {

  selectedCategory: string;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  afterChangeCategory: Subject<void> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public productSrv: ProductService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {
    this.afterConfirm.takeUntil(this.destroy$).subscribe(() => {
      this.changeCategory();
    });

  }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onCategorySelect(id: string) {
    this.selectedCategory = id;
    this.satisfyConfirm.next(true);
  }//onCategorySelect

  changeCategory() {

    let changeAsync = () => {
      return new Promise((resolve, reject) => {
        this.productSrv.bulkChangeCategory(this.data.ids, this.selectedCategory).first().subscribe(() => {
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
          console.log('err', err);
          resolve({ k: 'message.OperationError', v: { value: err } });
        });
      });
    };//changeAsync

    let transAsync = (mobj: { k: string, v: any }) => {
      return new Promise((resolve) => {
        this.tranSrv.get(mobj.k, mobj.v).first().subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//transAsync

    changeAsync().then(transAsync).then(msg => {
      this.snackBarSrv.simpleBar(msg as string);
      this.afterChangeCategory.next();
    });

  }//changeCategory

}
