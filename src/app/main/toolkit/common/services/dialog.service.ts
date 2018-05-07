import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog) { }

  /**
   * 确认对话框
   * @param message 
   * @param width 
   * @param height 
   */
  confirmDialog(message: string, width?: number, height?: number) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: width ? `${width}px` : '300px',
      height: height ? `${height}px` : '',
      data: { message: message, }
    });
  }//confirmDialog

}
