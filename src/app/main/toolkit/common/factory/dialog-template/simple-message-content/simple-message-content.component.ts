import { Component, OnInit, Inject } from '@angular/core';
import { ISimpleConfirm } from '../simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-simple-message-content',
  templateUrl: './simple-message-content.component.html',
  styleUrls: ['./simple-message-content.component.scss']
})
export class SimpleMessageContentComponent implements OnInit, ISimpleConfirm {

  content:string;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean>= new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.content = this.data.content;
  }//ngOnInit

}
