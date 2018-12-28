import { Component, OnInit } from '@angular/core';
import { DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-member-detail-hierarchy-editor',
  templateUrl: './member-detail-hierarchy-editor.component.html',
  styleUrls: ['./member-detail-hierarchy-editor.component.scss']
})
export class MemberDetailHierarchyEditorComponent implements OnInit {

  detailForm: FormGroup;
  constructor(protected interactSrv: DetailEditorInteractService, protected formBuilder: FormBuilder) {

    this.detailForm = this.formBuilder.group({
      id: [],
      mail: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      province: [''],
      city: ['']
    });
  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe(data => {
      this.detailForm.patchValue(data);
    });
  }//ngOnInit

}
