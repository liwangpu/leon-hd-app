import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MaterialDetailMdService } from '../material-detail-md.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { MaterialService } from '../../../../toolkit/server/webapi/material.service';

@Component({
  selector: 'app-material-detail-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, private detaiMdSrv: MaterialDetailMdService, private materialSrv: MaterialService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
  }//constructor

  ngOnInit() {
    this.detailForm.patchValue(this.detaiMdSrv.currentMaterial);
  }//ngOnInit

  submit() {
    let saveProdAsync = () => {
      return new Promise((resolve) => {
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
}
