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

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  closeDialog(){
    this.dialogRef.close();
  }//closeDialog
  
  onCancel() {
    (this.componentIns as ISimpleConfirm).afterCancel.next();
    this.dialogRef.close();
  }//closeDialog

  onConfirm() {
    (this.componentIns as ISimpleConfirm).afterConfirm.next();
    this.dialogRef.close();
  }//onConfirm

}

export interface ISimpleConfirm {
  afterConfirm: Subject<void>;
  afterCancel: Subject<void>;
  satisfyConfirm: Subject<boolean>;
}

