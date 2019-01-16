import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// import { ISimpleConfirm } from '../../../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { ProductGroupLeftCategoryLaunchService } from '../../../../product-group/product-group-left-category-launch.service';
import { YSimplePaginatorLaunchService } from './y-simple-paginator-launch.service';
import { ISimpleConfirm, IQueryFilter } from '@app/app-legacy';
// import { IQueryFilter } from '@app/app-legacy/models/common';
// import { IQueryFilter } from '../../../../../share/common/interfaces/iqueryFilter';

@Component({
  selector: 'app-package-detail-content-list-x-product-group-y-edit-form',
  templateUrl: './y-edit-form.component.html',
  styleUrls: ['./y-edit-form.component.scss'],
  providers: [ProductGroupLeftCategoryLaunchService, YSimplePaginatorLaunchService]
})
export class YEditFormComponent implements OnInit, ISimpleConfirm {

  data: any;
  idsArr: Array<string> = [];
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(public dataLaunch: YSimplePaginatorLaunchService, public leftCategoyMdSrv: ProductGroupLeftCategoryLaunchService) {

  }

  ngOnInit() {
  }

  onGroupSelect(idsArr: Array<string>) {
    this.idsArr = idsArr;
    this.satisfyConfirm.next(idsArr.length > 0 ? true : false);
  }//dataLaunch

  onSelectCategory(catId: string) {
    let advFilters: Array<IQueryFilter> = [
      { field: 'categoryId', value: catId }
    ];
    this.dataLaunch.query({}, advFilters);
  }//onSelectProductCategory
}
