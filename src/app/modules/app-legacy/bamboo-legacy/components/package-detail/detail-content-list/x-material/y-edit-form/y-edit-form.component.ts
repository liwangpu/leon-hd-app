import { Component, OnInit } from '@angular/core';
import { YSimplePaginatorLaunchService } from './y-simple-paginator-launch.service';
import { MaterialLeftCategoryLaunchService } from '../../../../material/material-left-category-launch.service';
import { Subject } from 'rxjs';
import { ISimpleConfirm, IQueryFilter } from '@app/app-legacy';
// import { IQueryFilter } from '@app/app-legacy/common/interfaces/iqueryFilter';
// import { IQueryFilter } from '../../../../../share/common/interfaces/iqueryFilter';
// import { ISimpleConfirm } from '../../../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';

@Component({
  selector: 'app-y-edit-form',
  templateUrl: './y-edit-form.component.html',
  styleUrls: ['./y-edit-form.component.scss'],
  providers: [MaterialLeftCategoryLaunchService, YSimplePaginatorLaunchService]
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
  constructor(public dataLaunch: YSimplePaginatorLaunchService, public leftCategoyMdSrv: MaterialLeftCategoryLaunchService) { }

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
