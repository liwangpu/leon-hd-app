import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ISimpleConfirm } from '../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MaterialService } from '../../../toolkit/server/webapi/material.service';
import { SnackbarService } from '../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-category-suit',
  template: `
  <app-material-category-select-panel (onCategorySelect)='onCategorySelect($event)'></app-material-category-select-panel>
  `
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public materialSrv: MaterialService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {
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
    let bCloseDialog = false;
    let changeAsync = () => {
      return new Promise((resolve, reject) => {
        this.materialSrv.bulkChangeCategory(this.data.ids, this.selectedCategory).first().subscribe(() => {
          bCloseDialog = true;
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
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
      this.doneAsync.next();
      if (bCloseDialog)
        this.closeDialog.next();
    });

  }//changeCategory
}
