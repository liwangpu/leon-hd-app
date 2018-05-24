import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISimpleConfirm } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { AssetCategory } from '../../../../toolkit/models/assetcategory';

@Component({
  selector: 'app-category-change-suit',
  template: `
  <app-material-category-select-panel (onCategorySelectWithDetail)='onCategorySelect($event)'></app-material-category-select-panel>
  `
})
export class CategoryChangeSuitComponent implements OnInit, OnDestroy, ISimpleConfirm {

  doneAsync: Subject<boolean>= new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  refreshData: Subject<AssetCategory> = new Subject();
  constructor() { }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  onCategorySelect(cate: AssetCategory) {
    this.satisfyConfirm.next(true);
    this.refreshData.next(cate);
  }//onCategorySelect
}
