import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AssetCategory } from 'micro-dmz-hd';
import { MatCheckbox, MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-v1-category-editor-form',
  templateUrl: './v1-category-editor-form.component.html',
  styleUrls: ['./v1-category-editor-form.component.scss']
})
export class V1CategoryEditorFormComponent implements OnInit, OnDestroy {


  enableConfirm = false;
  detailForm: FormGroup;
  afterSubmit = new Subject<any>();
  @ViewChild('isolateCt') isolateCt: MatCheckbox;
  constructor(protected formBuilder: FormBuilder) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      parentId: ['', [Validators.required]],
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      tag: [''],
      isolate: ['false'],
      description: ['']
    });
  }

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(vl => {
      this.enableConfirm = this.detailForm.valid;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterSubmit.complete();
    this.afterSubmit.unsubscribe();
  }//ngOnDestroy

  afterReceiveData(data: { category: AssetCategory }) {
    this.detailForm.patchValue(data.category);
    this.isolateCt.checked = data.category.isolate;
  }//afterReceiveData

  onConfirm() {
    this.afterSubmit.next(this.detailForm.value);
  }//onConfirm

  onIsolateChange(evt: MatCheckboxChange) {
    this.detailForm.patchValue({
      isolate: evt.checked
    });
  }//onIsolateChange

}
