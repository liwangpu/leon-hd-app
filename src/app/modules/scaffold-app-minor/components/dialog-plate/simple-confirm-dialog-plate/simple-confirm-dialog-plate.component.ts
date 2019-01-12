import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { IConfirmDialogComponentButton } from '../../../interfaces/i-confirm-dialog-component-button';
import { IConfirmDialogComponentBase } from '../../../interfaces/i-confirm-dialog-component-base';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-simple-confirm-dialog-plate',
  templateUrl: './simple-confirm-dialog-plate.component.html',
  styleUrls: ['./simple-confirm-dialog-plate.component.scss']
})
export class SimpleConfirmDialogPlateComponent implements OnInit {

  hideCancelButton = false;
  manageButtons: Array<IConfirmDialogComponentButton> = [];
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SimpleConfirmDialogPlateComponent>, protected comFactory: ComponentFactoryResolver) {

  }//constructor

  ngOnInit() {
    this.dialogContentContainer.clear();
    let comp = this.comFactory.resolveComponentFactory(this.data.tpls);
    this.componentIns = this.dialogContentContainer.createComponent(comp).instance;
    this.title = this.data.title;

    let ins = this.componentIns as IConfirmDialogComponentBase;

    this.hideCancelButton = !ins.hideCancelButton ? true : false;
    this.manageButtons = ins.manageButtons;

    ins.satisfyConfirm$.pipe(takeUntil(this.destroy$)).subscribe((satisfy) => {
      this.satisfyConfirm = satisfy;
    });

    ins.closeDialog$.pipe(takeUntil(this.destroy$)).subscribe((satisfy) => {
      this.closeDialog();
    });

    ins.disableConfirmButton$.pipe(takeUntil(this.destroy$)).subscribe((disable) => {
      this.disableConfirmButton = disable;
    });

    ins.disableCancelButton$.pipe(takeUntil(this.destroy$)).subscribe((disable) => {
      this.disableCancelButton = disable;
    });

    ins.disableButtons$.pipe(takeUntil(this.destroy$)).subscribe((disable) => {
      if (disable)
        this.disableAllButton();
      else
        this.enableAllButton();
    });

    ins.persistDialog$.pipe(takeUntil(this.destroy$)).subscribe((persist) => {
      this.disableCloseButton = true;
    });

    ins.doneAsync$.pipe(takeUntil(this.destroy$)).subscribe((persist) => {
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
    (this.componentIns as IConfirmDialogComponentBase).afterCancel$.next();
    this.closeDialog();
  }//closeDialog

  onConfirm() {
    this.disableAllButton();
    (this.componentIns as IConfirmDialogComponentBase).afterConfirm$.next();
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
