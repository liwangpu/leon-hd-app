import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { DetailBasicEditorExBase, DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { UserRole } from '@geek/micro-app-basic';


@Component({
  selector: 'app-work-flow-detail-basic-editor-ex',
  templateUrl: './work-flow-detail-basic-editor-ex.component.html',
  styleUrls: ['./work-flow-detail-basic-editor-ex.component.scss']
})
export class WorkFlowDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: []
      , applyOrgans: ['']
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.dataRefershSubject$.subscribe((data: UserRole) => {
      this.detailForm.patchValue(data);
    });//
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

  onApplyOrganChange(evt: MatRadioChange) {
    this.detailForm.patchValue({ applyOrgans: evt.value })
  }//onApplyOrganChange

}
