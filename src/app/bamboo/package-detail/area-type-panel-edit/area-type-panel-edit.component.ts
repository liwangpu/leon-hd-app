import { Component, OnInit } from '@angular/core';
import { ISimpleConfirm } from '../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreaType } from '../../../share/models/area-type';
import { PackageService } from '../../../share/services/webapis/package.service';
import { AreaTypeService } from '../../../share/services/webapis/area-type.service';

@Component({
  selector: 'app-area-type-panel-edit',
  templateUrl: './area-type-panel-edit.component.html',
  styleUrls: ['./area-type-panel-edit.component.scss']
})
export class AreaTypePanelEditComponent implements OnInit, ISimpleConfirm {

  data: any;
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
  constructor(public areaTypeSrv: AreaTypeService, public formBuilder: FormBuilder, public packageSrv: PackageService) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      areaAlias: [''],
      packageId: [''],
      areaTypeId: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(() => {
      let vl = this.detailForm.valid;
      if (vl !== this.latestValidState) {
        this.satisfyConfirm.next(vl);
      }
      this.latestValidState = vl;
    });

    setTimeout(() => {
      this.detailForm.patchValue(this.data.areaType);
    }, 300);

    this.areaTypeSrv.query({}).subscribe(res => {
      this.areas = res.data;
    });
  }//ngOnInit

  selectionChange(id: string) {
    if (!id) return;
    let selectedArea = this.areas.filter(x => x.id == id)[0];
    this.detailForm.patchValue({ areaAlias: selectedArea.name });
  }//
}
