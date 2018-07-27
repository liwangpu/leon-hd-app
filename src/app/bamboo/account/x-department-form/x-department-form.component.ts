import { Component, OnInit, OnDestroy, Output, EventEmitter, Inject } from '@angular/core';
import { ISimpleConfirm } from '../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, concat } from 'rxjs';
import { Department } from '../../../share/models/department';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AsyncHandleService } from '../../../share/services/common/async-handle.service';
import { DepartmentService } from '../../../share/services/webapis/department.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-x-department-form',
  templateUrl: './x-department-form.component.html',
  styleUrls: ['./x-department-form.component.scss']
})
export class XDepartmentFormComponent implements OnInit, OnDestroy, ISimpleConfirm {

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
    this.afterConfirm.pipe(takeUntil(this.destroy$)).subscribe(_ => this.onSubmit());
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
    let source$ = this.departmentSrv.update({ ...this.department, ...this.departForm.value });
    let getOrganSource$ = this.departmentSrv.getByOrgan();
    this.asyncHandle.asyncRequest(concat(source$, getOrganSource$)).subscribe(null, null, () => {
      this.doneAsync.next();
      this.closeDialog.next();
    });
  }//onSubmit
}
