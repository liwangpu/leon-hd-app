import { Component, OnInit, Injectable } from '@angular/core';
import { GroupListCategoryMapsMdService } from './group-list-category-maps-md.service';
import { ISimpleConfirm } from '../../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { CommonCategoryTplsMdService } from '../../../common/common-category-tpls/common-category-tpls-md.service';
import { ProductCategoryService } from '../../../../../toolkit/server/webapi/productcategory.service';
import { IQueryFilter } from '../../../../../toolkit/common/interfaces/iqueryFilter';


@Injectable()
export class ProductCategoryDetailMdService extends CommonCategoryTplsMdService {

  constructor(public apiSrv: ProductCategoryService) {
    super();
  }
}


@Component({
  selector: 'app-group-list-category-maps-dialog-tpls',
  templateUrl: './group-list-category-maps-dialog-tpls.component.html',
  styleUrls: ['./group-list-category-maps-dialog-tpls.component.scss'],
  providers: [GroupListCategoryMapsMdService, ProductCategoryDetailMdService]
})
export class GroupListCategoryMapsDialogTplsComponent implements OnInit, ISimpleConfirm {
  selectedId: string;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(public mdSrv: GroupListCategoryMapsMdService,public leftCategoryMdSrv:ProductCategoryDetailMdService) { }

  ngOnInit() {
  }

  onCategorySelect(categoryId?: string) {
    let advFilters: Array<IQueryFilter> = [
      { field: 'categoryId', value: categoryId }
    ];
    this.mdSrv.query({}, advFilters);
  }//onCategorySelect

  onItemSelect(ids: Array<string>) {
    this.satisfyConfirm.next(ids && ids.length > 0 ? true : false);
    this.selectedId = ids[0];
  }//onItemSelect
}
