import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ProductGroupLeftCategoryMdService } from '../product-group-left-category-md.service';
import { ISimpleConfirm } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs/Subject';
import { ProductGroupService } from '../../../../toolkit/server/webapi/product-group.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AsyncHandleService } from '../../../services/async-handle.service';

@Component({
  selector: 'app-change-category-suit',
  templateUrl: './change-category-suit.component.html',
  providers: [ProductGroupLeftCategoryMdService]
})
export class ChangeCategorySuitComponent implements OnInit, OnDestroy, ISimpleConfirm {
  selectedCategory: string;
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public productGroupSrv: ProductGroupService, public leftCategoryMdSrv: ProductGroupLeftCategoryMdService, protected asyncHandleSrv: AsyncHandleService) {
    this.afterConfirm.takeUntil(this.destroy$).subscribe(() => {
      this.changeCategory();
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onCategorySelect(id: string) {
    this.selectedCategory = id;
    this.satisfyConfirm.next(true);
  }//onCategorySelect

  changeCategory() {
    let source$ = this.productGroupSrv.bulkChangeCategory(this.data.ids, this.selectedCategory);
    this.asyncHandleSrv.asyncRequest(source$).subscribe(_ => {
      this.doneAsync.next();
      this.afterChangeCategory.next();
      this.closeDialog.next();
    }, err => {
      this.doneAsync.next();
    });

  }//changeCategory

}
