import { Component, OnInit, AfterContentInit, ContentChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicInfoTabExtendManageButton, BasicInfoTabExtend } from '../detail-edit-refers';
import { Subject } from 'rxjs';
import { DetailEditMdService } from '../detail-edit-md.service';
import { AsyncHandleService } from '../../../../services/common/async-handle.service';
import { takeUntil } from 'rxjs/operators';
import { FileAsset } from '../../../../models/fileasset';
import { AppProgressService } from 'scaffold-app-core';

@Component({
  selector: 'app-detail-edit-basic-info-tab',
  templateUrl: './basic-info-tab.component.html',
  styleUrls: ['./basic-info-tab.component.scss']
})
export class BasicInfoTabComponent implements OnInit, AfterContentInit {


  iconUploadUrl: string;
  detailForm: FormGroup;
  manageButtons: Array<BasicInfoTabExtendManageButton> = [];
  destroy$ = new Subject<boolean>();
  @ContentChild(BasicInfoTabExtend) ext: BasicInfoTabExtend;

  get extCanSave() {
    if (this.ext)
      return this.ext.canSave;
    return true;
  }

  constructor(private formBuilder: FormBuilder, public detaiMdSrv: DetailEditMdService, private asyncHandle: AsyncHandleService, protected progressSrv: AppProgressService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });

    //订阅实体数据更新后事件
    this.detaiMdSrv.afterDataRefresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.detailForm.patchValue(this.detaiMdSrv.currentData);
      if (this.ext) {
        this.ext.afterDataChange$.next(this.detaiMdSrv.currentData);
      }
    });//
  }

  ngOnInit(): void {
    this.iconUploadUrl = this.detaiMdSrv.apiSrv.uri + '/changeICon';
    this.detailForm.patchValue(this.detaiMdSrv.currentData);
  }//ngOnInit

  ngAfterContentInit(): void {
    if (this.ext) {
      this.ext.afterDataChange$.next(this.detaiMdSrv.currentData);
      this.manageButtons = this.ext.manageButtons;
    }
  }//ngAfterContentInit

  afterIConChange(ass: FileAsset) {
    this.detaiMdSrv.currentData.icon = ass.url;
    this.detaiMdSrv.currentData.iconAssetId = ass.id;
    this.detaiMdSrv.afterIConChange$.next(ass.url);
    if (this.ext) {
      this.ext.afterDataChange$.next(this.detaiMdSrv.currentData);
    }
  }//afterIConChange

  submit() {
    //显示进度条
    this.progressSrv.showProgress = true;
    let vl = this.detailForm.value;
    let ol = this.detaiMdSrv.currentData;
    vl.iconAssetId = this.detaiMdSrv.currentData.iconAssetId;
    let fusdata: any;
    if (this.ext)
      fusdata = { ...ol, ...vl, ...this.ext.data }
    else
      fusdata = { ...ol, ...vl }
    let source$ = this.detaiMdSrv.apiSrv.update(fusdata);
    this.asyncHandle.asyncRequest(source$).subscribe(res => {
      this.detaiMdSrv.currentData = res;
      if (this.ext) {
        this.ext.afterDataChange$.next(this.detaiMdSrv.currentData);
      }
      //关闭进度条
      this.progressSrv.showProgress = false;
    });
  }//submit

}
