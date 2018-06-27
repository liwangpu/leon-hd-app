import { Component, OnInit, AfterContentInit, ContentChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { DetailEditScheduleService } from '../detail-edit-schedule.service';
import { FileAsset } from '../../../../../toolkit/models/fileasset';
import { AsyncHandleService } from '../../../../services/async-handle.service';
import { Ilistable } from '../../../../../toolkit/models/ilistable';

/**
 * 基础信息扩展视图基类
 */
export abstract class BasicInfoTabExtend {
  private _canSave = false;
  satisfySave$: Subject<boolean> = new Subject();
  afterDataChange$ = new BehaviorSubject<any>({});
  destroy$: Subject<boolean> = new Subject();
  data: any;
  manageButtons: Array<BasicInfoTabExtendManageButton> = [];
  set canSave(vl: boolean) {
    this._canSave = vl;
    this.satisfySave$.next(vl);
  }
  get canSave() {
    return this._canSave;
  }

}

export interface BasicInfoTabExtendManageButton {
  name: string;
  icon: string;
  click: (data: Ilistable) => void;
  needPersistent?: boolean;
}



@Component({
  selector: 'app-detail-edit-basic-info-tab',
  templateUrl: './basic-info-tab.component.html',
  styleUrls: ['./basic-info-tab.component.scss']
})
export class BasicInfoTabComponent implements OnInit, AfterContentInit {


  iconUploadUrl: string;
  detailForm: FormGroup;
  manageButtons: Array<BasicInfoTabExtendManageButton> = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ContentChild(BasicInfoTabExtend) ext: BasicInfoTabExtend;

  get extCanSave() {
    if (this.ext)
      return this.ext.canSave;
    return true;
  }

  constructor(private formBuilder: FormBuilder, public detaiMdSrv: DetailEditScheduleService, private asyncHandle: AsyncHandleService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });

    //订阅实体数据更新后事件
    this.detaiMdSrv.afterDataRefresh$.takeUntil(this.destroy$).subscribe(() => {
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
  }//afterIConChange

  submit() {
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
    });
  }//submit
}

