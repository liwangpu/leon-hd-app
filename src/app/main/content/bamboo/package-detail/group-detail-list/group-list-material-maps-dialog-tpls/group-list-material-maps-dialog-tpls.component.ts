import { Component, OnInit, Injectable } from '@angular/core';
import { ISimpleConfirm } from '../../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { GroupListMaterialMapsDialogMdService } from './group-list-material-maps-dialog-md.service';
import { IQueryFilter } from '../../../../../toolkit/common/interfaces/iqueryFilter';
import { CommonCategoryTplsMdService } from '../../../common/common-category-tpls/common-category-tpls-md.service';
import { MaterialCategoryService } from '../../../../../toolkit/server/webapi/material-category.service';

@Injectable()
export class MaterialDetailCategoryMdService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: MaterialCategoryService) {
    super();
  }
}
@Component({
  selector: 'app-group-list-material-maps-dialog-tpls',
  templateUrl: './group-list-material-maps-dialog-tpls.component.html',
  styleUrls: ['./group-list-material-maps-dialog-tpls.component.scss'],
  providers: [GroupListMaterialMapsDialogMdService,MaterialDetailCategoryMdService]
})
export class GroupListMaterialMapsDialogTplsComponent implements OnInit, ISimpleConfirm {
  selectedMaterialId: string;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(public mdSrv: GroupListMaterialMapsDialogMdService,public leftCategoryMdSrv:MaterialDetailCategoryMdService) {
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
    this.selectedMaterialId = ids[0];
  }//onItemSelect
}
