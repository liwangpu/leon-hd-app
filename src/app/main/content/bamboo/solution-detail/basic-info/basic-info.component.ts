import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime.js';
import { SolutionDetailMdService } from "../solution-detail-md.service";
import { SolutionService } from "../../../../toolkit/server/webapi/solution.service";
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
import { Subject } from 'rxjs';
import { fuseAnimations } from '../../../../../core/animations';
import { FileAsset } from '../../../../toolkit/models/fileasset';
import { PathService } from '../../../services/path.service';
@Component({
  selector: 'app-solution-detail-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BasicInfoComponent implements OnInit {

  iconUploadUrl: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, public detaiMdSrv: SolutionDetailMdService, private solutionSrv: SolutionService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, public pathSrv: PathService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
    this.iconUploadUrl = this.solutionSrv.uri + '/changeICon';
  }//constructor

  ngOnInit() {
    this.detailForm.patchValue(this.detaiMdSrv.solution);
    //value change事件发布
    this.detailForm.valueChanges.takeUntil(this.destroy$).debounceTime(150).subscribe(data => {
      if (this.detailForm.valid)
        this.detaiMdSrv.onEdit$.next();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  submit() {

    let saveProdAsync = () => {
      return new Promise((resolve) => {
        let vl = this.detailForm.value;
        let ol = this.detaiMdSrv.solution;
        this.solutionSrv.update({ ...ol, ...vl }).first().subscribe(resProd => {
          this.detaiMdSrv.solution.id = resProd.id;
          this.detaiMdSrv.solution.name = resProd.name;
          this.detaiMdSrv.solution.description = resProd.description;
          this.detaiMdSrv.afterSaveSolution$.next();
          this.detailForm.patchValue(this.detaiMdSrv.solution);
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
    this.detaiMdSrv.solution.icon = ass.url;
    this.detaiMdSrv.solution.iconAssetId = ass.id;
  }//afterIConChange
}
