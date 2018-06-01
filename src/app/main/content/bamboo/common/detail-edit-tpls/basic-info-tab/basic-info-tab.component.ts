import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, ContentChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SnackbarService } from '../../../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { DetailEditScheduleService } from '../detail-edit-schedule.service';
import { FileAsset } from '../../../../../toolkit/models/fileasset';

/**
 * 基础信息扩展视图基类
 */
export abstract class BasicInfoTabExtend {
  private _canSave = false;
  satisfySave$: Subject<boolean> = new Subject();
  afterDataChange$: Subject<any> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  data: any;

  set canSave(vl: boolean) {
    this._canSave = vl;
    this.satisfySave$.next(vl);
  }
  get canSave() {
    return this._canSave;
  }

}


@Component({
  selector: 'app-detail-edit-basic-info-tab',
  templateUrl: './basic-info-tab.component.html',
  styleUrls: ['./basic-info-tab.component.scss']
})
export class BasicInfoTabComponent implements OnInit, AfterContentInit {


  iconUploadUrl: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ContentChild(BasicInfoTabExtend) ext: BasicInfoTabExtend;

  get extCanSave() {
    if (this.ext)
      return this.ext.canSave;
    return true;
  }

  constructor(private formBuilder: FormBuilder, public detaiMdSrv: DetailEditScheduleService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });

    //订阅实体数据更新后事件
    this.detaiMdSrv.afterDataRefresh$.takeUntil(this.destroy$).subscribe(() => {
      this.detailForm.patchValue(this.detaiMdSrv.currentData);
    });//
  }

  ngOnInit(): void {
    this.iconUploadUrl = this.detaiMdSrv.apiSrv.uri + '/changeICon';
    this.detailForm.patchValue(this.detaiMdSrv.currentData);
  }//ngOnInit

  ngAfterContentInit(): void {
    if (this.ext) {
      this.ext.afterDataChange$.next(this.detaiMdSrv.currentData);
    }
  }//ngAfterContentInit

  afterIConChange(ass: FileAsset) {
    this.detaiMdSrv.currentData.icon = ass.url;
    this.detaiMdSrv.currentData.iconAssetId = ass.id;
  }//afterIConChange

  submit() {
    let saveProdAsync = () => {
      return new Promise((resolve) => {
        let vl = this.detailForm.value;
        let ol = this.detaiMdSrv.currentData;
        vl.iconAssetId = this.detaiMdSrv.currentData.iconAssetId;
        let fusdata: any;
        if (this.ext)
          fusdata = { ...ol, ...vl, ...this.ext.data }
        else
          fusdata = { ...ol, ...vl }
        this.detaiMdSrv.apiSrv.update(fusdata).first().subscribe(resData => {
          this.detaiMdSrv.currentData = resData;
          this.detailForm.patchValue({ id: resData.id });
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
          resolve({ k: 'message.OperationError', v: { value: err } });
        });
      });//promise
    };//saveProdAsync

    let transAsync = (mobj: { k: string, v: any }) => {
      return new Promise((resolve) => {
        this.tranSrv.get(mobj.k, mobj.v).first().subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//transAsync

    saveProdAsync().then(transAsync).then(msg => {
      this.snackBarSrv.simpleBar(msg as string);
    });

  }//submit
}

