import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailBasicEditorExBase, DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-member-registry-detail-basic-editor-ex',
  templateUrl: './member-registry-detail-basic-editor-ex.component.html',
  styleUrls: ['./member-registry-detail-basic-editor-ex.component.scss']
})
export class MemberRegistryDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: [],
      mail: [''],
      phone: [''],
      province: [''],
      city: ['']
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataRefershSubject$.subscribe(data => {
      this.detailForm.patchValue(data);
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
