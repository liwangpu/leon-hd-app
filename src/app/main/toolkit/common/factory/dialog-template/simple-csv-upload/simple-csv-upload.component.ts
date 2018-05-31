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
import { WorkingTimeComponent } from '../../../components/working-time/working-time.component';
@Component({
  selector: 'app-simple-csv-upload',
  templateUrl: './simple-csv-upload.component.html',
  styleUrls: ['./simple-csv-upload.component.scss']
})
export class SimpleCsvUploadComponent implements OnInit, OnDestroy, ISimpleConfirm {

  showAlarm: boolean;
  uploadUrl: string;
  templateCsvUrl: string;
  doneAsync: Subject<boolean> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  @ViewChild('fileInputCt') fileInputCt: ElementRef;
  @ViewChild(WorkingTimeComponent) workingAlarm: WorkingTimeComponent;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private config: ConfigService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, private windowSrv: WindowService) {
    this.afterConfirm.takeUntil(this.destroy$).subscribe(() => {
      this.uploadFile();
    });
  }//constructor

  ngOnInit() {
    this.uploadUrl = this.data.uploadUrl;
    this.templateCsvUrl = this.data.templateCsvUrl;
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  onFileChange(event: any) {
    this.stopAlarm();
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0)
      this.satisfyConfirm.next(true);
    else
      this.satisfyConfirm.next(false);
  }//onFileChange


  startAlarm() {
    this.showAlarm = true;
    this.workingAlarm.start();
  }//

  stopAlarm() {
    this.workingAlarm.stop();
    this.showAlarm = false;
  }//


  uploadFile() {
    if (!this.uploadUrl)
      return;
    let fileBrowser = this.fileInputCt.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.startAlarm();
      let formData = new FormData();
      let file = fileBrowser.files[0];
      let header = new HttpHeaders({});

      formData.append("file", file);
      let fileUrl = `${this.config.serverBase}/${this.uploadUrl}`;

      let bCloseDialog = false;
      let bUploadSuccessfult = false;
      let uploadAsync = () => {
        return new Promise((resolve, reject) => {
          this.http.request('PUT', fileUrl, { headers: header, body: formData, responseType: 'blob' }).first().subscribe((fs) => {
            if (fs.size > 0) {
              ((_fs) => {
                saveAs(_fs, 'Import Result.csv');
              })(fs);
              resolve({ k: 'message.OperationError', v: { value: '导入数据不规范' } });
            }
            else {
              bCloseDialog = true;
              bUploadSuccessfult = true;
              resolve({ k: 'message.SaveSuccessfully' });
            }
          }, err => {
            resolve({ k: 'message.OperationError', v: { value: err } });
          });
        });//Promise
      };//uploadAsync

      let transAsync = (mobj: { k: string, v: any }) => {
        return new Promise((resolve) => {
          this.tranSrv.get(mobj.k, mobj.v).subscribe(msg => {
            resolve(msg);
          });
        });//promise
      };//transAsync

      uploadAsync().then(transAsync).then((msg) => {
        this.snackBarSrv.simpleBar(msg as string);
        this.stopAlarm();
        this.doneAsync.next(bUploadSuccessfult);
      });//async
    }//if
  }//uploadFile

  downloadCsvTemplate() {
    if (!this.templateCsvUrl)
      return;
    let fileUrl = `${this.config.serverBase}/${this.templateCsvUrl}`;
    this.http.request('GET', fileUrl, { responseType: 'blob' }).first().subscribe((fs) => {
      if (fs.size > 0) {
        ((_fs) => {
          saveAs(_fs, 'Import Template.csv');
        })(fs);
      }
    }, err => {
      this.snackBarSrv.simpleBar(err);
    });


  }//downloadCsvTemplate
}
