import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { FileAsset } from '../../../../models/fileasset';

@Component({
  selector: 'app-upload-icon-dialog',
  templateUrl: './upload-icon-dialog.component.html',
  styleUrls: ['./upload-icon-dialog.component.scss']
})
export class UploadIconDialogComponent implements OnInit, OnDestroy {

  uploadUrl: string;
  objId: string;
  iconUrl: string;
  componentIns: any;
  afterUpload$: Subject<FileAsset> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  @ViewChild('dialogContentContainer', {
    read: ViewContainerRef
  }) dialogContentContainer: ViewContainerRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private comFactory: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.dialogContentContainer.clear();
    let comp = this.comFactory.resolveComponentFactory(this.data.component);
    this.componentIns = this.dialogContentContainer.createComponent(comp).instance;
    this.uploadUrl = this.data.uploadUrl;
    this.objId = this.data.objId;
    this.iconUrl = this.data.iconUrl;
    this.componentIns.uploadUrl = this.uploadUrl;
    this.componentIns.objId = this.objId;
    this.componentIns.iconUrl = this.iconUrl;
    (this.componentIns as IUploadIConDialog).afterUpload$.takeUntil(this.destroy$).subscribe(asset => {
      this.afterUpload$.next(asset);
    });

  }//ngOnInit

  ngOnDestroy(): void {
    this.dialogContentContainer.clear();
  }//ngOnDestroy

  select() {
    (this.componentIns as IUploadIConDialog).onSelect$.next();
  }//cancel

  confirm() {
    (this.componentIns as IUploadIConDialog).onUpload$.next();
  }//confirm

}


export interface IUploadIConDialog {
  onUpload$: Subject<void>;
  onSelect$: Subject<void>;
  afterUpload$: Subject<FileAsset>;
  onError$: Subject<void>;
}
