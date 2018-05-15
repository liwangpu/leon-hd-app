import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent as SuitConfirmDialogComponent } from '../components/dialog/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogComponent as SimpleConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";
import { ComponentType } from '@angular/cdk/portal';
import { UploadIconDialogComponent } from '../components/dialog/upload-icon-dialog/upload-icon-dialog.component';
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
    return this.dialog.open(SimpleConfirmDialogComponent, {
      width: width ? `${width}px` : '300px',
      height: height ? `${height}px` : '',
      data: { message: message, }
    });
  }//confirmDialog

  confirmDialogSuit(component: ComponentType<any>, message: string, width?: number, height?: number) {
    this.dialog.open(SuitConfirmDialogComponent, {
      width: width ? `${width}px` : '450px',
      height: height ? `${height}px` : '500px',
      data: { message: message, component: component }
    });//


    // let ins = dialog.componentInstance as IConfirmDialog;
    // ins.
  }//confirmDialogSuit

  changeIConDialogSuit(component: ComponentType<any>, message: string, uploadUrl: string, objId: string, iconUrl: string, width?: number, height?: number) {
    return this.dialog.open(UploadIconDialogComponent, {
      width: width ? `${width}px` : '450px',
      height: height ? `${height}px` : '500px',
      data: { message: message, component: component, uploadUrl: uploadUrl, objId: objId, iconUrl: iconUrl }
    });//

  }//changeIConDialogSuit

}
