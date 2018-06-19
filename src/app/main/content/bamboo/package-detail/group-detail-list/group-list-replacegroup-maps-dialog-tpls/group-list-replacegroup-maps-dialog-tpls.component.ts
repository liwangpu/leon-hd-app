import { Component, OnInit } from '@angular/core';
import { ISimpleConfirm } from '../../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs/Subject';
import { GroupListReplacegroupMapsDialogMdService } from './group-list-replacegroup-maps-dialog-md.service';
import { IQueryFilter } from '../../../../../toolkit/common/interfaces/iqueryFilter';

@Component({
  selector: 'app-package-detail-group-list-replacegroup-maps-dialog-tpls',
  templateUrl: './group-list-replacegroup-maps-dialog-tpls.component.html',
  styleUrls: ['./group-list-replacegroup-maps-dialog-tpls.component.scss'],
  providers: [GroupListReplacegroupMapsDialogMdService]
})
export class GroupListReplacegroupMapsDialogTplsComponent implements OnInit, ISimpleConfirm {
  selectedProductIds: Array<string>;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(public mdSrv: GroupListReplacegroupMapsDialogMdService) {
  }//constructor

  ngOnInit() {
  }//ngOnInit

  onCategorySelect(categoryId?: string) {
    let advFilters: Array<IQueryFilter> = [
      { field: 'categoryId', value: categoryId }
    ];
    this.mdSrv.query({}, advFilters);
  }//onCategorySelect

  onItemSelect(ids: Array<string>) {
    this.satisfyConfirm.next(ids && ids.length > 0 ? true : false);
    this.selectedProductIds = ids;
  }//onItemSelect
}
