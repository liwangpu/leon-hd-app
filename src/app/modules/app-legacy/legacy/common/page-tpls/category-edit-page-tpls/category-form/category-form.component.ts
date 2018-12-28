import { Component, OnInit, Inject } from '@angular/core';
import { ISimpleConfirm } from '../../../factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, ISimpleConfirm {

  categoryForm: FormGroup;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.categoryForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      displayIndex: [''],
      parentId: ['']
    });
  }//constructor


  ngOnInit() {
    this.categoryForm.patchValue(this.data.category);
    this.categoryForm.valueChanges.subscribe(vl => {
      this.satisfyConfirm.next(vl.name ? true : false);
    });
  }//ngOnInit

}
