import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { ISimpleConfirm } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { AssetCategory } from '../../../../toolkit/models/assetcategory';
import { CommonCategoryTplsMdService } from '../../common/common-category-tpls/common-category-tpls-md.service';
import { MaterialCategoryService } from '../../../../toolkit/server/webapi/material-category.service';

@Injectable()
export class MaterialDetailCategoryMdService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: MaterialCategoryService) {
    super();
  }
}

@Component({
  selector: 'app-category-change-suit',
  template: `
  <app-common-category-select-panel [launch]='catSelectMdSrv' (onCategorySelectWithDetail)='onCategorySelect($event)'></app-common-category-select-panel>
  `,
  providers: [MaterialDetailCategoryMdService]
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
  constructor(public catSelectMdSrv: MaterialDetailCategoryMdService) {
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
