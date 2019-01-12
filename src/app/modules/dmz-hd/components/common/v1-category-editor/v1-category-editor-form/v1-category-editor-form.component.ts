import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AssetCategory } from 'micro-dmz-hd';

@Component({
  selector: 'app-v1-category-editor-form',
  templateUrl: './v1-category-editor-form.component.html',
  styleUrls: ['./v1-category-editor-form.component.scss']
})
export class V1CategoryEditorFormComponent implements OnInit, OnDestroy {


  enableConfirm = false;
  detailForm: FormGroup;
  afterSubmit = new Subject<any>();
  constructor(protected formBuilder: FormBuilder) {
    this.detailForm = this.formBuilder.group({
      id: [''],
      parentId: ['', [Validators.required]],
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
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
  }//afterReceiveData

  onConfirm() {
    this.afterSubmit.next(this.detailForm.value);
  }//onConfirm

}
