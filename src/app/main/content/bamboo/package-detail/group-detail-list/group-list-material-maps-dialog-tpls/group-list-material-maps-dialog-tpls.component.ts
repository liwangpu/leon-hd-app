import { Component, OnInit } from '@angular/core';
import { ISimpleConfirm } from '../../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { GroupListMaterialMapsDialogMdService } from './group-list-material-maps-dialog-md.service';

@Component({
  selector: 'app-group-list-material-maps-dialog-tpls',
  templateUrl: './group-list-material-maps-dialog-tpls.component.html',
  styleUrls: ['./group-list-material-maps-dialog-tpls.component.scss'],
  providers:[GroupListMaterialMapsDialogMdService]
})
export class GroupListMaterialMapsDialogTplsComponent implements OnInit,ISimpleConfirm {
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(public mdSrv:GroupListMaterialMapsDialogMdService) { }

  ngOnInit() {
  }

}
