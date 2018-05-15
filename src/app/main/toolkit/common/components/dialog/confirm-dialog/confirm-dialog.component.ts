import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-set-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {


  @ViewChild('dialogContentContainer', {
    read: ViewContainerRef
  }) dialogContentContainer: ViewContainerRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private comFactory: ComponentFactoryResolver) {

  }

  ngOnInit() {
    let component = this.data.component as IConfirmDialog;
    this.dialogContentContainer.clear();
    let comp = this.comFactory.resolveComponentFactory(this.data.component);
    let dyCom = this.dialogContentContainer.createComponent(comp);

  }//ngOnInit

  ngOnDestroy(): void {
    this.dialogContentContainer.clear();
  }//ngOnDestroy

  cancel() {

  }//cancel

  confirm() {

  }//confirm

}


export interface IConfirmDialog {
  onConfirm$: Subject<void>;
  onCancel$: Subject<void>;
  onError$: Subject<void>;
}
