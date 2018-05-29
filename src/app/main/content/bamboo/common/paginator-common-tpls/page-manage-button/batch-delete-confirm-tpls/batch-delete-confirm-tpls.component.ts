import { Component, OnInit } from '@angular/core';
import { ISimpleConfirm } from '../../../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-batch-delete-confirm-tpls',
  templateUrl: './batch-delete-confirm-tpls.component.html',
  styleUrls: ['./batch-delete-confirm-tpls.component.scss']
})
export class BatchDeleteConfirmTplsComponent implements OnInit, ISimpleConfirm {

  msg: string;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.satisfyConfirm.next(true);
    }, 800);
  }//ngOnInit

}
