import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaShareResource } from '../../../share/models/media-share-resource';
import { MediaShareService } from '../../../share/services/webapis/media-share.service';
import { DialogFactoryService } from '../../../share/common/factories/dialog-factory.service';
import { WindowService } from '../../../share/common/objects/window.service';
import { AsyncHandleService } from '../../../share/services/common/async-handle.service';
import { SimpleMessageContentComponent } from '../../../share/common/factories/dialog-template/simple-message-content/simple-message-content.component';

@Component({
  selector: 'app-media-file-share-edit-item',
  templateUrl: './share-edit-item.component.html',
  styleUrls: ['./share-edit-item.component.scss']
})
export class ShareEditItemComponent implements OnInit {

  detailForm: FormGroup;
  editMode: boolean;
  hidePassword = true;
  @Input() idx: number;
  @Input() mediaId: string;
  @Input() mediaType: string;
  @Input() shareResource: MediaShareResource = new MediaShareResource();
  @Output() afterDelete = new EventEmitter<string>();
  @Output() afterSave = new EventEmitter<MediaShareResource>();
  constructor(private formBuilder: FormBuilder, protected apiSrv: MediaShareService, protected dialogFac: DialogFactoryService, protected windowSrv: WindowService, protected asyncHandle: AsyncHandleService) {

    this.detailForm = this.formBuilder.group({
      mediaId: [''],
      id: [''],
      name: ['', [Validators.required]],
      startShareTimeStamp: ['', [Validators.required]],
      stopShareTimeStamp: [''],
      password: [''],
      type: []
    });
  }//constructor

  ngOnInit() {
  }//ngOnInit


  ngOnChanges(changes: SimpleChanges): void {
    let res = changes['shareResource'];
    if (res) {
      let shareData = (res.currentValue as MediaShareResource);
      let startDate = new Date(shareData.startShareTimeStamp * 1000);
      let stopData = new Date(shareData.stopShareTimeStamp * 1000);
      this.detailForm.patchValue({ ...shareData, startShareTimeStamp: startDate, stopShareTimeStamp: stopData });
      if (!res.currentValue.id) {
        this.detailForm.enable();
        this.editMode = true;
      }
      else
        this.detailForm.disable();
    }
    let mediaobj = changes['mediaId'];
    if (mediaobj)
      this.detailForm.patchValue({ mediaId: mediaobj.currentValue });
  }//ngOnChanges

  viewPassword() {
    if (!this.editMode) return;
    this.hidePassword = !this.hidePassword;
  }//

  delete() {
    if (!this.shareResource.id) {
      this.afterDelete.next(this.shareResource.id);
      return;
    }

    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: this.detailForm.value.name } });

    dialog.afterOpen().subscribe(() => {
      let ins: SimpleMessageContentComponent = dialog.componentInstance.componentIns;
      ins.afterConfirm.subscribe(() => {
        let source$ = this.apiSrv.delete(this.detailForm.value.id);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          this.afterDelete.next(this.shareResource.id);
          ins.closeDialog.next();
        });
      });//afterConfirm
    });//afterOpen
  }//delete

  save() {
    if (!this.editMode) {
      this.editMode = !this.editMode;
      this.detailForm.enable();
      this.hidePassword = true;
      return;
    }

    let shareData: MediaShareResource = this.detailForm.value;
    if (shareData.startShareTimeStamp)
      shareData.startShareTimeStamp = new Date(shareData.startShareTimeStamp).getTime() / 1000;
    if (shareData.stopShareTimeStamp)
      shareData.stopShareTimeStamp = new Date(shareData.stopShareTimeStamp).getTime() / 1000;
    let source$ = this.apiSrv.update(shareData);
    this.asyncHandle.asyncRequest(source$).subscribe(() => {
      this.detailForm.disable();
      this.hidePassword = true;
      this.editMode = !this.editMode;
    });

  }//save

  viewShare() {
    this.windowSrv.nativeWindow.open(this.shareResource.url);
  }//viewShare

}
