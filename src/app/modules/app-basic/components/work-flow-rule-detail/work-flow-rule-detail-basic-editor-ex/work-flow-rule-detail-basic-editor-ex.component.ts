import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { WorkFlowRule } from '@geek/micro-app-basic';

@Component({
  selector: 'app-work-flow-rule-detail-basic-editor-ex',
  templateUrl: './work-flow-rule-detail-basic-editor-ex.component.html',
  styleUrls: ['./work-flow-rule-detail-basic-editor-ex.component.scss']
})
export class WorkFlowRuleDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: []
      , keyword: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.dataRefershSubject$.subscribe((data: WorkFlowRule) => {
      this.detailForm.patchValue(data);
    });//
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

}
