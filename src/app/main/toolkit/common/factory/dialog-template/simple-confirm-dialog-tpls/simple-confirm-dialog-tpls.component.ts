import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-simple-confirm-dialog-tpls',
  templateUrl: './simple-confirm-dialog-tpls.component.html',
  styleUrls: ['./simple-confirm-dialog-tpls.component.scss']
})
export class SimpleConfirmDialogTplsComponent implements OnInit, OnDestroy {

  title: string;
  satisfyConfirm: boolean;
  disableCancelButton: boolean;
  disableConfirmButton: boolean;
  disableCloseButton: boolean;
  componentIns: any;
  destroy$: Subject<boolean> = new Subject();
  @ViewChild('dialogContentContainer', {
    read: ViewContainerRef
  }) dialogContentContainer: ViewContainerRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SimpleConfirmDialogTplsComponent>, protected comFactory: ComponentFactoryResolver) {

  }//constructor

  ngOnInit() {
    this.dialogContentContainer.clear();
    let comp = this.comFactory.resolveComponentFactory(this.data.tpls);
    this.componentIns = this.dialogContentContainer.createComponent(comp).instance;
    this.title = this.data.title;

    (this.componentIns as ISimpleConfirm).satisfyConfirm.takeUntil(this.destroy$).subscribe((satisfy) => {
      this.satisfyConfirm = satisfy;
    });

    (this.componentIns as ISimpleConfirm).closeDialog.takeUntil(this.destroy$).subscribe((satisfy) => {
      this.closeDialog();
    });

    (this.componentIns as ISimpleConfirm).disableConfirmButton.takeUntil(this.destroy$).subscribe((disable) => {
      this.disableConfirmButton = disable;
    });

    (this.componentIns as ISimpleConfirm).disableCancelButton.takeUntil(this.destroy$).subscribe((disable) => {
      this.disableCancelButton = disable;
    });

    (this.componentIns as ISimpleConfirm).disableButtons.takeUntil(this.destroy$).subscribe((disable) => {
      if (disable)
        this.disableAllButton();
      else
        this.enableAllButton();
    });

    (this.componentIns as ISimpleConfirm).persistDialog.takeUntil(this.destroy$).subscribe((persist) => {
      this.disableCloseButton = true;
    });

    (this.componentIns as ISimpleConfirm).doneAsync.takeUntil(this.destroy$).subscribe((persist) => {
      this.enableAllButton();
    });

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  closeDialog() {
    if (!this.disableCloseButton)
      this.dialogRef.close();
  }//closeDialog

  onCancel() {
    (this.componentIns as ISimpleConfirm).afterCancel.next();
    this.closeDialog();
  }//closeDialog

  onConfirm() {
    this.disableAllButton();
    (this.componentIns as ISimpleConfirm).afterConfirm.next();
  }//onConfirm

  enableAllButton() {
    this.disableCloseButton = false;
    this.disableCancelButton = false;
    this.disableConfirmButton = false;
  }//enableAllButton

  disableAllButton() {
    this.disableCloseButton = true;
    this.disableCancelButton = true;
    this.disableConfirmButton = true;
  }//disableAllButton

}

/**
 * 简单确认对话框
 * 对话框设定逻辑:
 * 1.默认对话框[确认]按钮不可用,[取消]按钮可用,点击[取消]或者[关闭对话框]按钮可以关闭对话框
 * 2.用户需要触发satisfyConfirm告诉对话框 启用|禁用确认按钮
 * 3.用户[确认]按钮后,对话框所有按钮开始禁用,也不能关闭对话框(详细请看该接口doneAsync定义),直到自定义模版组件用doneAsync通知对话框
 */
export interface ISimpleConfirm {
  /**
   * [对话框] => [自定义组件]
   * 供自定义模版组件订阅,用于接收确认对话框点击"确认"按钮响应
   */
  afterConfirm: Subject<void>;
  /**
   * [对话框] => [自定义组件]
   * 供自定义模版组件订阅,用于接收确认对话框点击"取消"按钮响应
   */
  afterCancel: Subject<void>;
  /**
   * [自定义组件] => [对话框]
   * 供对话框订阅,用于接收自定义模版组件触发"启用|禁用确认按钮"响应(默认确认按钮禁用)
   */
  satisfyConfirm: Subject<boolean>;
  /**
   * [自定义组件] => [对话框]
   * 供对话框订阅,用于接收自定义模版组件触发"关闭对话框"响应
   */
  closeDialog: Subject<void>;
  /**
   * [自定义组件] => [对话框]
   * 供对话框订阅,用于接收自定义模版组件触发"禁止|允许关闭对话框"响应
   */
  persistDialog: Subject<boolean>;
  /**
   * [自定义组件] => [对话框]
   * 供对话框订阅,用于接收自定义模版组件触发"禁用|启用所有按钮(确认,取消)"响应
   */
  disableButtons: Subject<boolean>;
  /**
   * [自定义组件] => [对话框]
   * 供对话框订阅,用于接收自定义模版组件触发"禁用|启用确认按钮"响应
   */
  disableConfirmButton: Subject<boolean>;
  /**
   * [自定义组件] => [对话框]
   * 供对话框订阅,用于接收自定义模版组件触发"禁用|启用取消按钮"响应
   */
  disableCancelButton: Subject<boolean>;
  /**
   * [自定义组件] => [对话框]
   * 供对话框订阅,用于接收自定义模版组件触发"事情做完"响应
   * 因为默认认为,开始点击[确认]按钮后开始做一件async事,又因为模版组会写有自定义逻辑
   * 如果对话框关闭,自定义逻辑将被销毁
   * 所以[确认]点击后,对话框所有按钮禁用,同时也不能关闭对话框
   * 直到用户触发doneAsync后
   */
  doneAsync: Subject<boolean>;
}

