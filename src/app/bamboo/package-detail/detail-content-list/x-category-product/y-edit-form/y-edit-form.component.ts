import { Component, OnInit } from '@angular/core';
import { ISimpleConfirm } from '../../../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { ProductLeftCategoryLaunchService } from '../../../../product/product-left-category-launch.service';
import { YSimplePaginatorLaunchService } from './y-simple-paginator-launch.service';
import { IQueryFilter } from '../../../../../share/common/interfaces/iqueryFilter';

@Component({
  selector: 'app-y-edit-form',
  templateUrl: './y-edit-form.component.html',
  styleUrls: ['./y-edit-form.component.scss'],
  providers: [ProductLeftCategoryLaunchService, YSimplePaginatorLaunchService]
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
  constructor(public dataLaunch: YSimplePaginatorLaunchService, public leftCategoyMdSrv: ProductLeftCategoryLaunchService) { }

  ngOnInit() {
  }

  onItemSelect(idsArr: Array<string>) {
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
