import { Component, OnInit } from '@angular/core';
import { OEditBaseComponent } from '../o-edit-base/o-edit-base.component';
import { FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-nav-edit-o-edit-link-group',
  templateUrl: './o-edit-link-group.component.html',
  styleUrls: ['./o-edit-link-group.component.scss']
})
export class OEditLinkGroupComponent extends OEditBaseComponent implements OnInit {

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
      url: [''],
      permission: ['']
    });
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}

