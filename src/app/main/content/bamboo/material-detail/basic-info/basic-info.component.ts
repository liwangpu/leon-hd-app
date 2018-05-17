import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MaterialDetailMdService } from '../material-detail-md.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { MaterialService } from '../../../../toolkit/server/webapi/material.service';
import { PathService } from '../../../services/path.service';
import { FileAsset } from '../../../../toolkit/models/fileasset';

@Component({
  selector: 'app-material-detail-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  iconUploadUrl: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, public detaiMdSrv: MaterialDetailMdService, private materialSrv: MaterialService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, public pathSrv: PathService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
    this.iconUploadUrl = this.materialSrv.uri + '/changeICon';
  }//constructor

  ngOnInit() {
    this.detailForm.patchValue(this.detaiMdSrv.currentMaterial);
  }//ngOnInit

  submit() {
    let saveProdAsync = () => {
      return new Promise((resolve) => {
        let vl=this.detailForm.value;
        vl.iconAssetId=this.detaiMdSrv.currentMaterial.iconAssetId;
        this.materialSrv.update(this.detailForm.value).first().subscribe(resOrder => {
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
}
