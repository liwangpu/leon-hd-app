import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'page-plate-simple-confirm-dialog',
  templateUrl: './simple-confirm-dialog.component.html',
  styleUrls: ['./simple-confirm-dialog.component.scss']
})
export class SimpleConfirmDialogComponent implements OnInit {

  @Output() afterConfirm = new EventEmitter<void>();
  @Output() afterReceiveData = new EventEmitter<any>();
  @Input() dialogIcon = 'label_important';
  @Input() dialogTitle = '对话框';
  @Input() enableConfirm: boolean;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //延迟一下再发布信息
    setTimeout(() => {
      this.afterReceiveData.next(this.data);
    }, 300);
  }//ngOnInit

  onConfirm() {
    this.afterConfirm.next();
  }//onConfirm

  onCloseDialog() {
    this.dialogRef.close();
  }//onCloseDialog

}
