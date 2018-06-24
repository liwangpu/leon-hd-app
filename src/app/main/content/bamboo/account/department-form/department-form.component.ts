import { Component, Inject, OnInit, ViewEncapsulation, Output, OnDestroy, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from "../../../../toolkit/server/webapi/department.service";
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
import { Department } from "../../../../toolkit/models/department";
import { ISimpleConfirm } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs/Subject';
import { AsyncHandleService } from '../../../services/async-handle.service';
@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit, OnDestroy, ISimpleConfirm {

  dialogTitle: string;
  departForm: FormGroup;
  department: Department;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  destroy$ = new Subject<boolean>();
  @Output() onSave: EventEmitter<void> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private departmentSrv: DepartmentService, protected asyncHandle: AsyncHandleService) {
    this.department = this.data.department ? this.data.department : new Department();
    this.departForm = this.formBuilder.group({
      id: [''],
      description: [''],
      name: ['', [Validators.required]],
    });
    this.afterConfirm.takeUntil(this.destroy$).subscribe(_ => this.onSubmit());
  }

  ngOnInit() {
    this.department = this.data.department;
    if (this.department)
      this.departForm.patchValue(this.department);

    this.departForm.valueChanges.subscribe(vl => {
      this.satisfyConfirm.next(vl ? true : false)
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onSubmit() {
    // console.log('ssfsdfsdf');
    let source$ = this.departmentSrv.update({ ...this.department, ...this.departForm.value });
    this.asyncHandle.asyncRequest(source$).subscribe(_ => {
      this.departmentSrv.getByOrgan().subscribe(_ => { });
      this.doneAsync.next();
      this.closeDialog.next();
    }, err => {
      this.doneAsync.next();
    });
    // this.departmentSrv.update(this.departForm.value).subscribe(res => {
    //   this.departForm.patchValue(res);
    //   this.department = res;
    //   this.snackBarSrv.simpleBar('保存成功');
    //   this.onSave.emit();
    // });
  }//onSubmit
}
