import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../toolkit/server/webapi/product.service';
import { GroupListCategoryMapsMdService } from './group-list-category-maps-md.service';
import { ISimpleConfirm } from '../../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { Product } from '../../../../../toolkit/models/product';

@Component({
  selector: 'app-group-list-category-maps-dialog-tpls',
  templateUrl: './group-list-category-maps-dialog-tpls.component.html',
  styleUrls: ['./group-list-category-maps-dialog-tpls.component.scss'],
  providers: [GroupListCategoryMapsMdService, ProductService]
})
export class GroupListCategoryMapsDialogTplsComponent implements OnInit, ISimpleConfirm {

  selectedGroup = new Product();
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(public mdSrv: GroupListCategoryMapsMdService) { }

  ngOnInit() {
  }

  onGroupSelect(data: Product) {
    this.selectedGroup = data;
    this.satisfyConfirm.next(Boolean(this.selectedGroup.id));
  }//

}
