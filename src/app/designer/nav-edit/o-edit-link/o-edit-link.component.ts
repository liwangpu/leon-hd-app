import { Component, OnInit } from '@angular/core';
import { OEditBaseComponent } from '../o-edit-base/o-edit-base.component';
import { FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '../../../../../node_modules/@angular/material';
@Component({
  selector: 'app-nav-edit-o-edit-link',
  templateUrl: './o-edit-link.component.html',
  styleUrls: ['./o-edit-link.component.scss']
})
export class OEditLinkComponent extends OEditBaseComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder) {
    super(formBuilder);
    this.detailForm = this.formBuilder.group({
      parentId: [''],
      oldId: [''],
      value: ['', [Validators.required]],
      nodeType: [''],
      uuid: [''],
      nameTranslateKey: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      url: ['', [Validators.required]],
      permission: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  permissionPoints = [];

  addPoint(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add 
    if ((value || '').trim()) {
      this.permissionPoints.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.detailForm.patchValue({ permission: this.permissionPoints.join(',') });
  }

  removePoint(item: string): void {
    const index = this.permissionPoints.indexOf(item);

    if (index >= 0) {
      this.permissionPoints.splice(index, 1);
    }
    this.detailForm.patchValue({ permission: this.permissionPoints.join(',') });
  }//remove

  refreshData(data: { parentId: string, id: string, value: string }) {
    let model = super.refreshData(data);

    if (model['permission'])
      this.permissionPoints = model['permission'].split(',');
    else
      this.permissionPoints = [];
    return model;
  }//refreshData
}

