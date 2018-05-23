import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { ISimpleConfirm } from '../simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfigService } from '../../../../config/config.service';
import { WindowService } from '../../../object/window.service';
import { saveAs } from 'file-saver/FileSaver';
@Component({
  selector: 'app-simple-csv-upload',
  templateUrl: './simple-csv-upload.component.html',
  styleUrls: ['./simple-csv-upload.component.scss']
})
export class SimpleCsvUploadComponent implements OnInit, OnDestroy, ISimpleConfirm {
  uploadUrl: string;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  @ViewChild('fileInputCt') fileInputCt: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private config: ConfigService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, private windowSrv: WindowService) {
    this.afterConfirm.takeUntil(this.destroy$).subscribe(() => {
      this.uploadFile();
    });
  }//constructor

  ngOnInit() {
    this.uploadUrl = this.data.uploadUrl;
  }//ngOnInit

  ngOnDestroy(): void {
    console.log(111, this.uploadUrl);
  }//ngOnDestroy

  onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0)
      this.satisfyConfirm.next(true);
    else
      this.satisfyConfirm.next(false);
  }//onFileChange

  uploadFile() {
    if (!this.uploadUrl)
      return;
    let fileBrowser = this.fileInputCt.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      let file = fileBrowser.files[0];
      let header = new HttpHeaders({});

      formData.append("file", file);
      let fileUrl = `${this.config.serverBase}/${this.uploadUrl}`;

      let uploadAsync = () => {
        return new Promise((resolve, reject) => {
          // this.http.post(fileUrl, formData, {
          //   headers: header
          // }).first().subscribe((resFile) => {
          //   this.afterUpload$.next(resFile as FileAsset);
          //   resolve(resFile);
          // }, err => reject(err));
          this.http.request('PUT', fileUrl, { headers: header, body: formData, responseType: 'blob' }).first().subscribe((fs) => {
            if (fs.size > 0) {
              //导入失败
              saveAs(fs, 'result.csv');
              // reject({ k: 'message.OperationError', v: { value: '导入数据不规范' } });
            }
            else {
              resolve({ k: 'message.SaveSuccessfully' });
            }
          }, err => {
            reject({ k: 'message.OperationError', v: { value: err } });
          });
        });//Promise
      };//uploadAsync

      uploadAsync().catch(()=>{

      });

      // let changeIConAsync = (resFile: FileAsset) => {
      //   return new Promise((resolve, reject) => {
      //     this.iconSrv.changeIcon(this.uploadUrl, { ObjId: this.objId, AssetId: resFile.id }).first()
      //       .subscribe(() => {
      //         resolve({ k: 'message.SaveSuccessfully' });
      //       }, err => {
      //         reject({ k: 'message.OperationError', v: { value: err } });
      //       });
      //   });
      // };//changeIConAsync


      // let tranAsync = (objMsg: { k: string, v: string }) => {
      //   return new Promise((resolve) => {
      //     this.tranSrv.get(objMsg.k, objMsg.v).first().subscribe(msg => {
      //       resolve(msg);
      //     });
      //   });//promise
      // };//tranAsync


    }//uploadFile

  }
}
