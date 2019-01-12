import { Component, OnInit, OnDestroy, TemplateRef, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { skip, takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DetailEditorInteractService } from '../../../services/detail-editor-interact.service';
import { DialogFactoryService, ChangeIconDialogPlateComponent } from 'scaffold-app-minor';
import { MatButton } from '@angular/material';
import { AppConfigService } from 'src/app/app-config.service';

@Component({
  selector: 'page-plate-basic-detail-editor',
  templateUrl: './basic-detail-editor.component.html',
  styleUrls: ['./basic-detail-editor.component.scss']
})
export class BasicDetailEditorComponent implements OnInit, OnDestroy {

  _permissionPoints: Array<string> = [];
  _exDetailFormSatisfyCommit = true;//扩展表单是否满足保存需求
  _curDetailFormSatisfyCommit = true;//当前表单是否满足保存需求
  _enbleUpdate = true;
  persisted = false;//数据已经保存到服务器
  detailForm: FormGroup;
  originData: any;
  destroy$ = new Subject<boolean>();
  dataRefreshSubject = this.interactSrv.afterDataRefresh$.pipe(takeUntil(this.destroy$)).pipe(skip(1));
  @Input() needlessChangeIcon = false;
  @Input() basicEditorEx: TemplateRef<any>;
  @Input() hideCreatedTime: boolean = true;
  @Input() hideModifiedTime: boolean;
  @Input() set permissionPoints(value: Array<string>) {
    this._permissionPoints = value ? value : [];
    this._enbleUpdate = this._permissionPoints.some(x => x.toLocaleLowerCase() == 'update');
    if (!this._enbleUpdate)
      this.detailForm.disable();
  }
  get permissionPoints(): Array<string> {
    return this._permissionPoints;
  }
  @Output() commitChange = new EventEmitter<any>();
  @Output() commitIconChange = new EventEmitter<{ id: string, assetsId: string, iconUrl: string }>();
  @ViewChild('submitBtn') submitBtn: MatButton;
  constructor(protected interactSrv: DetailEditorInteractService, protected formBuilder: FormBuilder, protected dialogFacSrv: DialogFactoryService, protected http: HttpClient, protected datePipeTr: DatePipe) {
    this.detailForm = this.formBuilder.group({
      id: []
      , iconAssetId: ['']
      , name: ['', [Validators.required, Validators.maxLength(50)]]
      , description: ['', [Validators.maxLength(200)]]
      , createdTime: [{ value: '', disabled: true }]
      , modifiedTime: [{ value: '', disabled: true }]
    });

    this.interactSrv.satisfyCommit$.pipe(takeUntil(this.destroy$)).subscribe(satisfy => {
      this._exDetailFormSatisfyCommit = satisfy;
    });//subscribe
  }//constructor

  get satisfyCommit(): boolean {
    return this._exDetailFormSatisfyCommit && this._curDetailFormSatisfyCommit;
  }

  ngOnInit() {
    this.dataRefreshSubject.subscribe(data => {
      //先释放保存按钮
      if (this.submitBtn)
        this.submitBtn.disabled = !this.satisfyCommit;
      if (!data) return;
      this.persisted = data.id ? true : false;
      let createdTime = this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd');
      let modifiedTime = this.datePipeTr.transform(data.modifiedTime, 'yyyy-MM-dd');
      data.createdTime = createdTime;
      data.modifiedTime = modifiedTime;
      this.detailForm.patchValue(data);
      this.originData = data;
    });//subscribe

    this.detailForm.valueChanges.subscribe(() => {
      this._curDetailFormSatisfyCommit = this.detailForm.valid;
    });

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  changeIcon() {
    let data = this.interactSrv.afterDataRefresh$.getValue();
    let config = { width: '460px', height: '542px' };
    let dialog = this.dialogFacSrv.tplsConfirm(ChangeIconDialogPlateComponent, '', config);
    dialog.afterOpen().subscribe(() => {
      let ins: ChangeIconDialogPlateComponent = dialog.componentInstance.componentIns;

      //先将图片上传至服务器
      ins.afterConfirm$.pipe(switchMap(() => {
        let fusData = ins.getIconFormData();
        return this.http.post(`${AppConfigService._AppConfig.server}/files/UploadFormFile`, fusData.formData, { headers: fusData.header })
      })).subscribe((res: any) => {
        this.detailForm.patchValue({
          iconAssetId: res.id
        });
        this.commitIconChange.next({ id: data.id, assetsId: res.id, iconUrl: res.url });
        ins.doneAsync$.next(true);
        ins.closeDialog$.next();
      }, error => {
        ins.doneAsync$.next(true);
      });//
    });//subscribe
  }//protected

  submit() {
    let data = this.detailForm.value;
    let dataEx = this.interactSrv.basicExDataChange$.getValue();
    if (dataEx)
      this.commitChange.next({ ...this.originData, ...data, ...dataEx });
    else
      this.commitChange.next({ ...this.originData, ...data });
    this.submitBtn.disabled = true;
  }//submit


}
