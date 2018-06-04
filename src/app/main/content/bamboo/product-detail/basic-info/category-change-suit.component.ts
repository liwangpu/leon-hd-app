import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISimpleConfirm } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { AssetCategory } from '../../../../toolkit/models/assetcategory';

@Component({
  selector: 'app-product-category-change-suit',
  template: `
  <app-product-category-select-panel (onCategorySelectWithDetail)='onCategorySelect($event)'></app-product-category-select-panel>
  `
})
export class CategoryChangeSuitComponent implements OnInit, OnDestroy, ISimpleConfirm {

  doneAsync: Subject<boolean> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  refreshData: Subject<AssetCategory> = new Subject();
  constructor() {
    this.afterConfirm.subscribe(() => {
      this.doneAsync.next();
      this.closeDialog.next();
    });
  }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  onCategorySelect(cate: AssetCategory) {
    this.satisfyConfirm.next(true);
    this.refreshData.next(cate);
    this.doneAsync.next();
  }//onCategorySelect
}
