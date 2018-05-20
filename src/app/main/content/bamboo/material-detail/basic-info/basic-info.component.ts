import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MaterialDetailMdService } from '../material-detail-md.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { MaterialService } from '../../../../toolkit/server/webapi/material.service';
import { PathService } from '../../../services/path.service';
import { FileAsset } from '../../../../toolkit/models/fileasset';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { CategoryChangeSuitComponent } from './category-change-suit.component';

@Component({
  selector: 'app-material-detail-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  iconUploadUrl: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, public detaiMdSrv: MaterialDetailMdService, private materialSrv: MaterialService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, public pathSrv: PathService, protected dialogFac: DialogFactoryService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
      categoryId: [''],
      categoryName: ['', [Validators.required]]
    });
    this.iconUploadUrl = this.materialSrv.uri + '/changeICon';
  }//constructor

  ngOnInit() {
    this.detailForm.patchValue(this.detaiMdSrv.currentMaterial);
  }//ngOnInit

  submit() {
    let saveProdAsync = () => {
      return new Promise((resolve) => {
        let vl = this.detailForm.value;
        let ol = this.detaiMdSrv.currentMaterial;
        this.materialSrv.update({ ...ol, ...vl }).first().subscribe(resOrder => {
          this.detaiMdSrv.currentMaterial = resOrder;
          this.detaiMdSrv.afterEdit$.next();
          this.detailForm.patchValue({ id: resOrder.id });
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

  afterIConChange(ass: FileAsset) {
    this.detaiMdSrv.currentMaterial.icon = ass.url;
    this.detaiMdSrv.currentMaterial.iconAssetId = ass.id;
  }//afterIConChange

  onEditCategory() {
    let dialog = this.dialogFac.tplsConfirm('选择分类', CategoryChangeSuitComponent, { width: '450px', height: '550px', data: {} });

    dialog.afterOpen().first().subscribe(() => {
      let ins = (dialog.componentInstance.componentIns as CategoryChangeSuitComponent);
      ins.refreshData.subscribe(cate => {
        this.detailForm.patchValue({ categoryId: cate.id, categoryName: cate.name });
      });
    });

  }//onEditCategory
}
