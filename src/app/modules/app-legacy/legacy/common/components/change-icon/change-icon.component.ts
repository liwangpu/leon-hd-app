import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Inject } from '@angular/core';
import { ISimpleConfirm, ICustomButton } from '../../factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathService } from '../../../services/common/path.service';
import { ConfigService } from '../../../services/config.service';
import { AsyncHandleService } from '../../../services/common/async-handle.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { concatMap, tap } from 'rxjs/operators';
import { FileAsset } from '../../../models/fileasset';
import { IconService } from '../../../services/webapis/icon.service';
import { AppProgressService } from 'scaffold-app-core';

@Component({
  selector: 'app-change-icon',
  templateUrl: './change-icon.component.html',
  styleUrls: ['./change-icon.component.scss']
})
export class ChangeIconComponent implements OnInit, OnDestroy, ISimpleConfirm {

  uploadUrl: string;
  objId: string;
  iconUrl: string = '#';
  afterUploadIcon = new Subject<FileAsset>();
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  hideCancelButton = true;
  manageButtons: Array<ICustomButton> = [
    { icon: 'open_in_browser', name: 'button.Select', onClick: () => { this.selectICon(); } }
  ];
  @ViewChild('fileInputCt') fileInputCt: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, protected pathSrv: PathService, protected config: ConfigService, private http: HttpClient, protected asyncHandle: AsyncHandleService, protected iconSrv: IconService, protected progressSrv: AppProgressService) { }

  ngOnInit() {
    this.iconUrl = this.data.iconUrl;
    this.uploadUrl = this.data.uploadUrl;
    this.objId = this.data.objId;

    this.afterConfirm.subscribe(() => {
      this.uploadIcon();
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  selectICon() {
    this.clearFile();
    this.fileInputCt.nativeElement.click();
  }//selectICon

  onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.iconUrl = e.target.result;
        this.satisfyConfirm.next(true);
      };
    }
    else
      this.satisfyConfirm.next(false);
  }//onFileChange

  uploadIcon() {
    if (!this.uploadUrl || !this.objId)
      return;

    let fileBrowser = this.fileInputCt.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      let file = fileBrowser.files[0];
      let header = new HttpHeaders({
        "fileExt": this.pathSrv.getFileExtension(file.name)
      });

      formData.append("file", file);
      let fileUrl = `${this.config.serverBase}/files/UploadFormFile`;


      let uploadFileSource$ = this.http.post(fileUrl, formData, { headers: header }).pipe(tap((rsfs: FileAsset) => {
        this.afterUploadIcon.next(rsfs);
      }));
      let source$ = uploadFileSource$.pipe(concatMap((resFile: FileAsset) => this.iconSrv.changeIcon(this.uploadUrl, { ObjId: this.objId, AssetId: resFile.id })));


      //显示进度条
      this.progressSrv.showProgress = true;
      this.asyncHandle.asyncRequest(source$).subscribe((res) => {
        //关闭进度条
        this.progressSrv.showProgress = false;
      }, err => { }, () => {
        this.doneAsync.next();
        this.closeDialog.next();
      });
    }
  }//uploadIcon

  clearFile() {
    this.fileInputCt.nativeElement.value = '';
  }//clearFile
}
