import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-member-detail-basic-editor-ex',
  templateUrl: './member-detail-basic-editor-ex.component.html',
  styleUrls: ['./member-detail-basic-editor-ex.component.scss']
})
export class MemberDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: [],
      mail: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      inviterName: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataRefershSubject$.subscribe(data => {
      this.detailForm.patchValue(data);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

}

