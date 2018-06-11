import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MediaShareResource } from '../../../../toolkit/models/media-share-resource';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaShareService } from '../../../../toolkit/server/webapi/media-share.service';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleMessageContentComponent } from '../../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { environment } from '../../../../../../environments/environment';
import { WindowService } from '../../../../toolkit/common/object/window.service';

@Component({
  selector: 'app-media-file-share-edit-item',
  templateUrl: './share-edit-item.component.html',
  styleUrls: ['./share-edit-item.component.scss']
})
export class ShareEditItemComponent implements OnInit, OnChanges {

  detailForm: FormGroup;
  editMode: boolean;
  hidePassword = true;
  @Input() mediaId: string;
  @Input() mediaType: string;
  @Input() shareResource: MediaShareResource = new MediaShareResource();
  @Output() afterDelete = new EventEmitter<string>();
  @Output() afterSave = new EventEmitter<MediaShareResource>();
  constructor(private formBuilder: FormBuilder, protected apiSrv: MediaShareService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, protected dialogFac: DialogFactoryService, protected windowSrv: WindowService) {

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

    let ins: SimpleMessageContentComponent;
    let transTipAsync = () => {
      return new Promise((resolve) => {
        this.tranSrv.get('message.DeleteConfirm',{value: this.detailForm.value.name}).subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//transAsync

    let dialogAsync = (tip) => {
      return new Promise((resolve) => {
        let dialog = this.dialogFac.simpleConfirm(tip);

        dialog.afterOpen().first().subscribe(() => {
          ins = (dialog.componentInstance.componentIns as SimpleMessageContentComponent);
          ins.content = tip as string;
          ins.afterConfirm.subscribe(() => {
            this.apiSrv.delete(this.detailForm.value.id).first().subscribe(() => {
              ins.doneAsync.next();
              resolve({ k: 'message.DeleteSuccessfully' });
            }, err => {
              ins.doneAsync.next();
              resolve({ k: 'message.OperationError', v: { value: err }, e: true });
            });
          });
        });//open

      });//promise  
    };

    let transAsync = (mobj: { k: string, v: any, e: boolean }) => {
      return new Promise((resolve, reject) => {
        this.tranSrv.get(mobj.k, mobj.v).first().subscribe(msg => {
          this.snackBarSrv.simpleBar(msg as string);
          if (mobj.e)
            reject();
          else
            resolve();
          // resolve(msg);
        });
      });//promise
    };//transAsync

    transTipAsync().then(dialogAsync).then(transAsync).then(() => {
      this.afterDelete.next(this.shareResource.id);
      ins.closeDialog.next();
    });
  }//delete

  save() {
    if (!this.editMode) {
      this.editMode = !this.editMode;
      this.detailForm.enable();
      this.hidePassword = true;
      return;
    }

    let saveAsync = () => {
      return new Promise((resolve, reject) => {
        let shareData: MediaShareResource = this.detailForm.value;
        if (shareData.startShareTimeStamp)
          shareData.startShareTimeStamp = new Date(shareData.startShareTimeStamp).getTime() / 1000;
        if (shareData.stopShareTimeStamp)
          shareData.stopShareTimeStamp = new Date(shareData.stopShareTimeStamp).getTime() / 1000;
        this.apiSrv.update(shareData).first().subscribe(data => {
          this.detailForm.patchValue({ id: data.id });
          this.afterSave.next(data);
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
          resolve({ k: 'message.OperationError', v: { value: err } });
        });
      });//Promise
    };//saveAsync

    let transAsync = (mobj: { k: string, v: any }) => {
      return new Promise((resolve) => {
        this.tranSrv.get(mobj.k, mobj.v).first().subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//transAsync

    saveAsync().then(transAsync).then(msg => {
      this.snackBarSrv.simpleBar(msg as string);
      this.detailForm.disable();
      this.hidePassword = true;
      this.editMode = !this.editMode;
    });
  }//save

  viewShare() {
    let type = this.mediaType ? this.mediaType : this.shareResource.type;
    let viewShareUrl = `${environment.shareServerBase}?t=${type}&id=${this.shareResource.id}`;
    this.windowSrv.nativeWindow.open(viewShareUrl);
  }//viewShare
}
