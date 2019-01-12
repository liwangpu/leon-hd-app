import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { AsyncHandleService } from "scaffold-app-minor";
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';
import { WorkFlowService, WorkFlowRuleService, WorkFlowRule, WorkFlow } from 'micro-app-basic';

@Component({
  selector: 'app-work-flow-rule-detail-define-editor',
  templateUrl: './work-flow-rule-detail-define-editor.component.html',
  styleUrls: ['./work-flow-rule-detail-define-editor.component.scss']
})
export class WorkFlowRuleDetailDefineEditorComponent implements OnInit, OnDestroy {

  detailForm: FormGroup;
  canCommit = false;
  usableWorkFlows = new Subject<Array<any>>();
  usableWorkFlowNames: Array<string> = [];
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected workFlowSrv: WorkFlowService, protected asyncHandleSrv: AsyncHandleService, protected ruleSrv: WorkFlowRuleService) {

    this.detailForm = this.formBuilder.group({
      keyword: []
      , workFlowId: []
      , workFlowName: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe((data: WorkFlowRule) => {
      if (!data) return;
      if (data.workFlowName)
        data.workFlowName = { name: data.workFlowName } as any;
      this.detailForm.patchValue(data);
    });//subscribe

    this.detailForm.valueChanges.subscribe(() => {
      this.canCommit = this.detailForm.valid;
    });//subscribe

    this.detailForm.get('workFlowName').valueChanges.subscribe(vl => {
      if (!vl) return;
      this.searchSubWorkFlow(vl.name);
    });

    //默认查询一些子流程作为默认选项
    this.searchSubWorkFlow();
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnInit

  displaySubWorkFlowFn(wk: WorkFlow) {
    return wk && wk.name ? wk.name : "";
  }//displaySubWorkFlowFn

  searchSubWorkFlow(name?: string) {
    let autoCPValue = this.usableWorkFlowNames.some(x => x == name);
    if (!autoCPValue) {
      this.workFlowSrv.query({
        page: 1,
        pageSize: 15,
        search: name ? name : ''
      }).subscribe(res => {
        this.usableWorkFlows.next(res.data ? res.data : []);
        this.usableWorkFlowNames = res.data ? res.data.map(x => x.name) : [];
      });
    }
  }//searchSubWorkFlow

  onSubWorkFlowSelectd(evt: MatAutocompleteSelectedEvent) {
    this.detailForm.patchValue({ workFlowId: evt.option.value.id });
  }//onSubWorkFlowSelectd

  onDefineFlowDetail() {
    var data = this.detailForm.value;
    data.workFlowName = undefined;
    let source$ = this.ruleSrv.defineRuleDetail(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe();
  }//onDefineFlowDetail

}
