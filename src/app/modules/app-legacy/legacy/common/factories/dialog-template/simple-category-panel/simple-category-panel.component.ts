import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ISimpleConfirm } from '../simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CommonCategoryTplsMdService } from '../../../page-tpls/category-edit-page-tpls/common-category-tpls-md.service';
import { AssetCategory } from '../../../../models/assetcategory';

@Component({
  selector: 'app-simple-category-panel',
  templateUrl: './simple-category-panel.component.html',
  styleUrls: ['./simple-category-panel.component.scss']
})
export class SimpleCategoryPanelComponent implements OnInit, OnDestroy, ISimpleConfirm {

  leftCategoryMdSrv: CommonCategoryTplsMdService;
  selectedCategory: AssetCategory;
  selectedCategoryId: string;
  doneAsync: Subject<boolean> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  afterChangeCategory: Subject<void> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }//constructor

  ngOnInit() {
    this.leftCategoryMdSrv = this.data.categoryLaunch;
  }//ngOnInit

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onCategorySelect(id: string) {
    this.selectedCategoryId = id;
    this.satisfyConfirm.next(true);
  }//onCategorySelect

  onCategorySelectWithDetai(cat: AssetCategory) {
    this.selectedCategory = cat;
  }//onCategorySelectWithDetai

}
