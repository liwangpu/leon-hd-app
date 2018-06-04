import { Component, Inject, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from "../../../../toolkit/server/webapi/department.service";
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
import { Department } from "../../../../toolkit/models/department";
@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DepartmentFormComponent implements OnInit {
  event: CalendarEvent;
  dialogTitle: string;
  departForm: FormGroup;
  department: Department;
  @Output() onSave: EventEmitter<void> = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<DepartmentFormComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private departmentSrv: DepartmentService, private snackBarSrv: SnackbarService) {
    this.department = this.data.department ? this.data.department : new Department();
    this.departForm = this.createDepartmentForm();
  }

  ngOnInit() {
    this.departForm.patchValue(this.department);
  }

  createDepartmentForm() {
    return this.formBuilder.group({
      id: [''],
      organizationId: [''],
      description: [''],
      name: ['', [Validators.required]],
    });
  }//createAccountForm

  onSubmit() {
    this.departmentSrv.update(this.departForm.value).subscribe(res => {
      this.departForm.patchValue(res);
      this.department = res;
      this.snackBarSrv.simpleBar('保存成功');
      this.onSave.emit();
    });
  }
}
