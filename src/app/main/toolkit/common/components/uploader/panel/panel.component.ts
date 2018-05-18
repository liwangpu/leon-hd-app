import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileAsset } from "../../../../models/fileasset";
import { FilenamePipe } from '../../../pipes/filename.pipe';
import { FileItem } from 'ng2-file-upload';
import { DownloadService } from '../../../services/download.service';
import { DialogService } from '../../../services/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { IInputCtData } from '../../../directives/input-ct.directive';
import { FileAssetService } from '../../../../server/webapi/fileasset.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Memory } from "../../../../memory/memory";


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
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;
  downloadFiles: Array<IDownload> = [];
  uploadFiles: Array<IDownload> = [];
  showDownload: boolean;
  showUpload: boolean;
  disabledAddFile: boolean;
  constructor(private fileNamePipe: FilenamePipe, private downloadSrv: DownloadService, private dialogSrv: DialogService, private tanslateSrv: TranslateService, private fileSrv: FileAssetService, private snackBarSrv: SnackbarService) { }

  ngOnInit() {
    //文件上传控件设置
    this.uploader = new FileUploader({ url: this.url, queueLimit: this.maxFileLimit ? this.maxFileLimit : 10, headers: [{ name: 'Authorization', value: `bearer ${Memory.getInstance().token}` }], removeAfterUpload: true });
    //订阅文件上传成功事件
    this.uploader.onCompleteItem = ((item: FileItem, response: string) => {
      const asset = JSON.parse(response);
      asset.name = this.getRegistryFileName(item.file.name);
      this.downloadFiles.push({ id: asset.id, name: asset.name, url: asset.url });
      this.refreshPanel();
      this.fileSrv.update(asset).subscribe(() => {
        this.onUpload.emit({ fileName: asset.name, asset: asset });
      }, () => {
        this.tanslateSrv.get('message.OperationError', { value: name }).subscribe(msg => {
          this.snackBarSrv.simpleBar(msg);
        });
      });
    });
    //订阅文件上传失败事件
    this.uploader.onErrorItem = (item: FileItem) => {
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
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  /**
   * FileUploader标准方法
   * @param e 
   */
  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  /**
   * 添加文件
   */
  _onAddFiles() {
    this.fileInputCt.nativeElement.click();
  }

  /**
   * 下载文件
   * @param path 
   */
  _onDownload(path: string) {
    this.downloadSrv.download(`${this.serverBase}/${path}`);
  }//_onDownload

  /**
   * 删除文件
   * @param id 
   * @param name 
   */
  _onDeleteFile(id: string, name: string) {
    this.tanslateSrv.get('message.DeleteConfirm', { value: name }).subscribe(msg => {
      let dialog = this.dialogSrv.confirmDialog(msg);
      dialog.afterClosed().subscribe(() => {
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
  _onClear(item?: FileItem) {
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
  refreshPanel() {
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
  registryUploadFile(value: IInputCtData): void {
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
  getRegistryFileName(identify: string): string {
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