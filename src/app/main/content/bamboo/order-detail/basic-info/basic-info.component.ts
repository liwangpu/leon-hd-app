import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { OrderDetailMdService } from '../order-detail-md.service';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from '../../../../toolkit/server/webapi/order.service';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { FileAsset } from '../../../../toolkit/models/fileasset';
import { PathService } from '../../../services/path.service';

@Component({
  selector: 'app-order-detail-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  iconUploadUrl: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder, public detaiMdSrv: OrderDetailMdService, private orderSrv: OrderService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, public pathSrv: PathService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
    this.iconUploadUrl = this.orderSrv.uri + '/changeICon';
  }//constructor

  ngOnInit() {
    this.detailForm.patchValue(this.detaiMdSrv.currentOrder);
  }//ngOnInit

  submit() {

    let saveProdAsync = () => {
      return new Promise((resolve) => {
        let vl = this.detailForm.value;
        let ol = this.detaiMdSrv.currentOrder;
        this.orderSrv.update({ ...ol, ...vl }).first().subscribe(resOrder => {
          this.detaiMdSrv.currentOrder = resOrder;
          this.detaiMdSrv.afterOrderChange$.next();
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
    this.detaiMdSrv.currentOrder.icon = ass.url;
    this.detaiMdSrv.currentOrder.iconAssetId = ass.id;
  }//afterIConChange
}
