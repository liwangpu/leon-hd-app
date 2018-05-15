import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FileAsset } from '../../../../models/fileasset';

@Component({
  selector: 'app-toolkit-uploader-panel2',
  templateUrl: './panel2.component.html',
  styleUrls: ['./panel2.component.scss']
})
export class Panel2Component implements OnInit, OnDestroy {


  @ViewChild('fileInputCt') fileInputCt: ElementRef;//input type=file控件
  waitUploadFile: Array<FileAsset> = [];
  destroy$: Subject<boolean> = new Subject();
  constructor() { }

  ngOnInit() {
  }//

  ngOnDestroy(): void {

  }//

  /**
   * 添加上传文件
   */
  addUpload() {
    this.fileInputCt.nativeElement.click();
  }//addUpload
}
