import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Renderer, ElementRef, OnChanges, SimpleChanges, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../../../server/webapi/auth.service';
import { FileAsset } from "../../../../models/fileasset";
import { FilenamePipe } from '../../../pipes/filename.pipe';
import { FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
// import { saveAs as importedSaveAs } from "file-saver";
import { DownloadService } from '../../../services/download.service';
import { Observable } from 'rxjs/observable';
import { DialogService } from '../../../services/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { IInputCtData } from '../../../directives/input-ct.directive';
import { FileAssetService } from '../../../../server/webapi/fileasset.service';
import { SnackbarService } from '../../../services/snackbar.service';
@Component({
  selector: 'app-file-upload-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnChanges {
  @Input() serverBase: string;//文件上传服务器demain
  @Input() url: string;//文件上传url
  @Input() maxFileLimit: number;//最大上传数量
  @Input() unLimited: boolean;//是否限制文件数量
  @Input() fileAsset: Array<FileAsset> = [];//已有文件信息
  @Output() onUpload: EventEmitter<IUpload> = new EventEmitter();
  @Output() onError: EventEmitter<string> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onFileSatisfy: EventEmitter<void> = new EventEmitter();
  @Output() onFileNotSatisfy: EventEmitter<void> = new EventEmitter();
  @ViewChild('fileInputCt') fileInputCt: ElementRef;
  private uploader: FileUploader;
  private hasBaseDropZoneOver: boolean = false;
  private hasAnotherDropZoneOver: boolean = false;
  private downloadFiles: Array<IDownload> = [];
  private uploadFiles: Array<IDownload> = [];
  private showDownload: boolean;
  private showUpload: boolean;
  private disabledAddFile: boolean;
  constructor(private renderer: Renderer, private authSrv: AuthService, private fileNamePipe: FilenamePipe, private downloadSrv: DownloadService, private dialogSrv: DialogService, private tanslateSrv: TranslateService, private fileSrv: FileAssetService, private snackBarSrv: SnackbarService) { }

  ngOnInit() {
    //文件上传控件设置
    this.uploader = new FileUploader({ url: this.url, queueLimit: this.maxFileLimit ? this.maxFileLimit : 10, headers: [{ name: 'Authorization', value: `bearer ${this.authSrv.token}` }], removeAfterUpload: true });
    //订阅文件上传成功事件
    this.uploader.onCompleteItem = ((item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      let asset = JSON.parse(response);

      // console.log(111,'file',asset);
      asset.name = this.getRegistryFileName(item.file.name);
      this.downloadFiles.push({ id: asset.id, name: asset.name, url: asset.url });
      this.refreshPanel();
      this.fileSrv.update(asset).subscribe(rdata => {
        // console.log(111,'file-111',asset);
        this.onUpload.emit({ fileName: asset.name, asset: asset });
      }, err => {
        this.tanslateSrv.get('message.OperationError', { value: name }).subscribe(msg => {
          this.snackBarSrv.simpleBar(msg);
        });
      });
    });
    //订阅文件上传失败事件
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.onError.emit(this.fileNamePipe.transform(item.file.name));
    };
    //订阅文件添加事件
    this.uploader.onAfterAddingFile = () => {
      this.refreshPanel();
      this.showDownload = false;
    };
    this.refreshPanel();
  }//ngOnInit


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileAsset']) {
      if (this.fileAsset && this.fileAsset.length > 0) {
        this.downloadFiles = this.fileAsset.map((x) => {
          return { id: x.id, name: x.name, url: x.url };
        });
        this.refreshPanel();
      }
    }
    else {
      this.fileAsset = [];
    }
  }//ngOnChanges

  /**
   * FileUploader标准方法
   * @param e 
   */
  private fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  /**
   * FileUploader标准方法
   * @param e 
   */
  private fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  /**
   * 添加文件
   */
  private _onAddFiles() {
    this.fileInputCt.nativeElement.click();
  }

  /**
   * 下载文件
   * @param path 
   */
  private _onDownload(path: string) {
    this.downloadSrv.download(`${this.serverBase}/${path}`);
  }//_onDownload

  /**
   * 删除文件
   * @param id 
   * @param name 
   */
  private _onDeleteFile(id: string, name: string) {
    this.tanslateSrv.get('message.DeleteConfirm', { value: name }).subscribe(msg => {
      let dialog = this.dialogSrv.confirmDialog(msg);
      dialog.afterClosed().subscribe(res => {
        if (dialog.componentInstance.isConfirm) {
          this.onDelete.emit(id);
          this.downloadFiles = this.downloadFiles.filter(it => it.id !== id);
          this.refreshPanel();
        }
      });
    });
    // this.refreshPanel();
  }//onDeleteFile

  /**
   * 移除上传队列
   * @param item 
   */
  private _onClear(item?: FileItem) {
    if (item) {
      item.remove();
    }
    else {
      this.uploader.clearQueue();
    }
    this.refreshPanel();
  }

  /**
   * 更新面板展示状态
   */
  private refreshPanel() {
    this.showDownload = this.downloadFiles.length > 0;
    this.showUpload = !this.showDownload && this.uploader && this.uploader.queue && this.uploader.queue.length <= 0;
    this.disabledAddFile = (this.uploader && this.uploader.queue && this.uploader.queue.length >= this.maxFileLimit) || this.downloadFiles.length >= this.maxFileLimit;
    if (this.downloadFiles.length >= this.maxFileLimit) {
      this.onFileSatisfy.emit();
    }
    else {
      this.onFileNotSatisfy.emit();
    }
  }//refreshPanel

  /**
   * 注册上传附件信息
   * @param value 
   */
  private registryUploadFile(value: IInputCtData): void {
    let isExist = this.uploadFiles.some(fl => fl.id == value.ctIndentity);
    if (isExist) {
      for (let idx = this.uploadFiles.length - 1; idx >= 0; idx--) {
        let curItem = this.uploadFiles[idx];
        if (curItem.id == value.ctIndentity)
          this.uploadFiles[idx] = { id: value.ctIndentity, name: value.ctValue, url: curItem.url };
      }
    }
    else {
      this.uploadFiles.push({ id: value.ctIndentity, name: value.ctValue, url: '' });
    }
  }//_registryUploadFile

  /**
   * 根据Id获取文件信息
   * @param identify 
   */
  private getRegistryFileName(identify: string): string {
    for (let idx = this.uploadFiles.length - 1; idx >= 0; idx--) {
      let curItem = this.uploadFiles[idx];
      if (curItem.id == identify)
        return curItem.name;
    }
    return '';
  }//getRegistryFileName
}//class

/**
 * 下载文件
 */
export interface IDownload {
  id: string;
  name: string;
  url: string;
}

/**
 * 上传文件
 */
export interface IUpload {
  fileName: string;
  asset: any;
  flag?: string;
}