import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MapDetailMdService } from '../map-detail-md.service';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { MapService } from '../../../../toolkit/server/webapi/map.service';
import { PathService } from '../../../services/path.service';
import { FileAsset } from '../../../../toolkit/models/fileasset';

@Component({
  selector: 'app-map-detail-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  iconUploadUrl:string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, private detaiMdSrv: MapDetailMdService, private mapSrv: MapService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, public pathSrv: PathService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });

    this.iconUploadUrl = this.mapSrv.uri + '/changeICon';
  }//constructor

  ngOnInit() {
    this.detailForm.patchValue(this.detaiMdSrv.currentMap);
  }//ngOnInit

  submit() {
    let saveProdAsync = () => {
      return new Promise((resolve) => {
        let vl = this.detailForm.value;
        let ol = this.detaiMdSrv.currentMap;
        this.mapSrv.update({ ...ol, ...vl }).first().subscribe(resOrder => {
          this.detaiMdSrv.currentMap = resOrder;
          this.detaiMdSrv.afterMapChange$.next();
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
    this.detaiMdSrv.currentMap.icon = ass.url;
    this.detaiMdSrv.currentMap.iconAssetId = ass.id;
  }//afterIConChange

}
