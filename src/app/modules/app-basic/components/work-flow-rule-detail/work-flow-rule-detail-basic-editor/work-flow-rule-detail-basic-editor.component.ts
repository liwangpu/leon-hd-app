import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from 'scaffold-app-minor';
import { DatePipe } from '@angular/common';
import { OrderService } from 'micro-dmz-oms';
import { WorkFlow, WorkFlowService, WorkFlowRuleService, WorkFlowRule } from 'micro-app-basic';

@Component({
  selector: 'app-work-flow-rule-detail-basic-editor',
  templateUrl: './work-flow-rule-detail-basic-editor.component.html',
  styleUrls: ['./work-flow-rule-detail-basic-editor.component.scss']
})
export class WorkFlowRuleDetailBasicEditorComponent implements OnInit {

  showFlowSelect = false;
  workFlowId: string;
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected orderSrv: OrderService, protected datePipeTr: DatePipe, protected ruleSrv: WorkFlowRuleService, public workFlowSrv: WorkFlowService) {

    this.detailForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      workFlowId: ['', [Validators.required]],
      createdTime: [{ value: '', disabled: true }],
      modifiedTime: [{ value: '', disabled: true }]
    });
  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe((data: WorkFlowRule) => {
      if (!data) return;
      this.workFlowId = data.workFlowId;
      this.showFlowSelect = true;
      this.detailForm.patchValue({
        id: data.id,
        name: data.name,
        description: data.description,
        createdTime: this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd'),
        modifiedTime: this.datePipeTr.transform(data.modifiedTime, 'yyyy-MM-dd')
      });
    });//subscribe
  }//ngOnInit

  submit() {
    let form = this.detailForm.value;
    let data = {
      workFlowRuleId: form['id'],
      workFlowId: form['workFlowId']
    };
    let source$ = this.ruleSrv.updateRuleDetail(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe();
  }//submit

  afterFlowSelect(flow: WorkFlow) {
    this.detailForm.patchValue({
      workFlowId: flow.id
    });
  }//afterFlowSelect

  afterFlowClear() {
    this.detailForm.patchValue({
      workFlowId: undefined
    });
  }//afterFlowClear

}
