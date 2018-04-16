import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from '../components/uploader/stepper/stepper.component';
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

  stepperUploader(title: string, step: number, width?: number, height?: number) {
    return this.dialog.open(StepperComponent, {
      width: width ? `${width}px` : '500px',
      height: height ? `${height}px` : '600px',
      data: { title: title, step: step }
    });
  }
}
