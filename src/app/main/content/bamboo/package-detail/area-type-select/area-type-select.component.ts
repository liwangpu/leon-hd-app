import { Component, OnInit, Inject } from '@angular/core';
import { ISimpleConfirm } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { AreaTypeService } from '../../../../toolkit/server/webapi/area-type.service';
import { AreaType } from '../../../../toolkit/models/area-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PackageService } from '../../../../toolkit/server/webapi/package.service';
import { AsyncHandleService } from '../../../services/async-handle.service';

@Component({
  selector: 'app-area-type-select',
  templateUrl: './area-type-select.component.html',
  styleUrls: ['./area-type-select.component.scss']
})
export class AreaTypeSelectComponent implements OnInit, ISimpleConfirm {

  latestValidState = false;
  detailForm: FormGroup;
  areas: Array<AreaType> = [];
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  constructor(public areaTypeSrv: AreaTypeService, public formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public packageSrv: PackageService, private asyncHandle: AsyncHandleService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      areaAlias: [''],
      packageId: [''],
      areaTypeId: ['', [Validators.required]]
    });

    this.afterConfirm.takeUntil(this.destroy$).subscribe(() => {
      this.submitAreaType();
    });
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(val => {
      let vl = this.detailForm.valid;
      if (vl !== this.latestValidState) {
        this.satisfyConfirm.next(vl);
      }
      this.latestValidState = vl;
    });

    setTimeout(() => {
      this.detailForm.patchValue(this.data.areaType);
    }, 300);

    this.areaTypeSrv.query({}).first().subscribe(res => {
      this.areas = res.data;
    });
  }//ngOnInit

  submitAreaType() {
    let source$ = this.packageSrv.editAreaType(this.detailForm.value);
    this.asyncHandle.asyncRequest(source$).subscribe(_ => {
      this.doneAsync.next();
      this.closeDialog.next();
    }, err => {
      this.doneAsync.next();
    });
  }//submitAreaType

  selectionChange(id: string) {
    if (!id) return;
    let selectedArea = this.areas.filter(x => x.id == id)[0];
    this.detailForm.patchValue({ areaAlias: selectedArea.name });
  }//

}
