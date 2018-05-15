import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input, Inject, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IConfirmDialog } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { IUploadIConDialog } from '../../dialog/upload-icon-dialog/upload-icon-dialog.component';
import { Observable } from "rxjs";
import { IconService } from '../../../../server/webapi/icon.service';
import { ConfigService } from '../../../../config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFileExtension } from "../../../classes/helper";
import { FileAsset } from '../../../../models/fileasset';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../services/snackbar.service';
@Component({
  selector: 'app-shared-upload-change-icon',
  templateUrl: './change-icon.component.html',
  styleUrls: ['./change-icon.component.scss']
})
export class ChangeIconComponent implements OnInit, OnDestroy, IUploadIConDialog {

  onUpload$: Subject<void> = new Subject();
  onSelect$: Subject<void> = new Subject();
  afterUpload$: Subject<FileAsset> = new Subject();
  onError$: Subject<void> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  uploadUrl: string;
  objId: string;
  iconUrl: string;
  @ViewChild('fileInputCt') fileInputCt: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private renderer2: Renderer2, private iconSrv: IconService, private http: HttpClient, private config: ConfigService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {
    this.onSelect$.takeUntil(this.destroy$).subscribe(() => {
      this.selectICon();
    });
    this.onUpload$.takeUntil(this.destroy$).subscribe(() => {
      this.uploadIcon();
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  selectICon() {
    this.clearFile();
    this.fileInputCt.nativeElement.click();

  }//select

  uploadIcon() {
    let fileBrowser = this.fileInputCt.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      let file = fileBrowser.files[0];
      let header = new HttpHeaders({
        "fileExt": getFileExtension(file.name)
      })

      formData.append("file", file);
      let fileUrl = `${this.config.serverBase}/files/UploadFormFile`;

      let uploadAsync = () => {
        return new Promise((resolve, reject) => {
          this.http.post(fileUrl, formData, {
            headers: header
          }).first().subscribe((resFile) => {
            this.afterUpload$.next(resFile as FileAsset);
            resolve(resFile);
          }, err => reject(err));
        });
      };//uploadAsync

      let changeIConAsync = (resFile: FileAsset) => {
        return new Promise((resolve, reject) => {
          this.iconSrv.changeIcon(this.uploadUrl, { ObjId: this.objId, AssetId: resFile.id }).first()
            .subscribe((resIcon) => {
              resolve({ k: 'message.SaveSuccessfully' });
            }, err => {
              reject({ k: 'message.OperationError', v: { value: err } });
            });
        });
      };//changeIConAsync


      let tranAsync = (objMsg: { k: string, v: string }) => {
        return new Promise((resolve) => {
          this.tranSrv.get(objMsg.k, objMsg.v).first().subscribe(msg => {
            resolve(msg);
          });
        });//promise
      };//tranAsync

      uploadAsync().then(changeIConAsync).then(tranAsync).then((msg) => {
        this.snackBarSrv.simpleBar(msg as string);
      });

    }
  }//submit

  onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.iconUrl = e.target.result;
      };
    }
  }//onFileChange

  clearFile() {
    this.fileInputCt.nativeElement.value = '';
  }//clearFile

}
