import { Component, OnInit } from '@angular/core';
import { ISimpleConfirm } from '../../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { GroupListGroupMapsMdService } from './group-list-group-maps-md.service';
import { ProductGroupService } from '../../../../../toolkit/server/webapi/product-group.service';
import { ProductGroup } from '../../../../../toolkit/models/product-group';

@Component({
  selector: 'app-group-list-group-maps-dialog-tpls',
  templateUrl: './group-list-group-maps-dialog-tpls.component.html',
  styleUrls: ['./group-list-group-maps-dialog-tpls.component.scss'],
  providers: [GroupListGroupMapsMdService, ProductGroupService]
})
export class GroupListGroupMapsDialogTplsComponent implements OnInit, ISimpleConfirm {
  selectedGroup = new ProductGroup();
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(public mdSrv: GroupListGroupMapsMdService) { }

  ngOnInit() {
  }

  onGroupSelect(data: ProductGroup) {
    this.selectedGroup = data;
    this.satisfyConfirm.next(Boolean(this.selectedGroup.id));
  }//
}
