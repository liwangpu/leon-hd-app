import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AsyncHandleService } from "@geek/scaffold-app-minor";
import { MatAutocompleteSelectedEvent, MatCheckboxChange } from '@angular/material';
import { WorkFlowService, WorkFlow, WorkFlowItem } from '@geek/micro-app-basic';

@Component({
  selector: 'app-work-flow-detail-flow-form',
  templateUrl: './work-flow-detail-flow-form.component.html',
  styleUrls: ['./work-flow-detail-flow-form.component.scss']
})
export class WorkFlowDetailFlowFormComponent implements OnInit, OnDestroy {

  _selectedRoleCount = 0;
  detailForm: FormGroup;
  autoWorkFlowCt = new FormControl();
  afterRefreshData = new Subject<any>();
  usableWorkFlows = new Subject<Array<any>>();
  usableWorkFlowNames: Array<string> = [];
  usableUserRoles: Array<{ id: string, name: string, checked?: boolean }> = [];
  destroy$ = new Subject<boolean>();
  constructor(protected formBuilder: FormBuilder, protected workFlowSrv: WorkFlowService, protected asyncHandleSrv: AsyncHandleService) {
    this.detailForm = this.formBuilder.group({
      id: []
      , flowGrade: ['']
      , workFlowId: ['']
      , subWorkFlowName: ['']
      , subWorkFlowId: ['']
      , autoWorkFlow: ['']
      , name: ['', [Validators.required]]
      , description: ['']
      , operateRoles: ['']
    });
  }

  ngOnInit() {
    this.detailForm.get('subWorkFlowName').valueChanges.subscribe(vl => {
      if (!vl) return;
      this.searchSubWorkFlow(vl.name);
    });

    //默认查询一些子流程作为默认选项
    this.searchSubWorkFlow();
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterRefreshData.complete();
    this.afterRefreshData.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

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

  displaySubWorkFlowFn(wk: WorkFlow) {
    return wk && wk.name ? wk.name : "";
  }//displaySubWorkFlowFn

  afterReceiveData(data: { WorkFlowItem: WorkFlowItem, UsableUserRoles: Array<{ id: string, name: string, checked?: boolean }> }) {
    if (!data) return;
    if (data.WorkFlowItem) {
      data.WorkFlowItem.flowGrade = data.WorkFlowItem.flowGrade ? data.WorkFlowItem.flowGrade : 0;
      if (data.WorkFlowItem.subWorkFlowName)
        data.WorkFlowItem.subWorkFlowName = { name: data.WorkFlowItem.subWorkFlowName } as any;
      this.detailForm.patchValue(data.WorkFlowItem);
      this.autoWorkFlowCt.patchValue(data.WorkFlowItem.autoWorkFlow);
      console.log(123, data);
    }
    if (data.UsableUserRoles) {
      let correctRoles = [];
      //检查之前的角色信息,因为有可能因为组织改变,之前的用户角色并不可用
      let originApplyRoleArr = data.WorkFlowItem && data.WorkFlowItem.operateRoles ? data.WorkFlowItem.operateRoles.split(',') : [];
      for (let it of originApplyRoleArr) {
        let exist = data.UsableUserRoles.some(x => x.id == it);
        if (exist)
          correctRoles.push(it);
      }
      let correctRolesStr = correctRoles.join(',');
      this.detailForm.patchValue({ operateRoles: correctRolesStr });
      let count = 0;
      for (let idx = data.UsableUserRoles.length - 1; idx >= 0; idx--) {
        let item = data.UsableUserRoles[idx];
        item.checked = correctRolesStr.indexOf(item.id) > -1;
        if (item.checked)
          count++;
      }
      this._selectedRoleCount = count;
      this.usableUserRoles = data.UsableUserRoles;
    }
  }//afterReceiveData

  onSubWorkFlowSelectd(evt: MatAutocompleteSelectedEvent) {
    this.detailForm.patchValue({ subWorkFlowId: evt.option.value.id });
  }//onSubWorkFlowSelectd

  onUserRoleCheck(evt: MatCheckboxChange) {
    let roleId = evt.source.value;
    let roleStr = this.detailForm.value.operateRoles;
    let operateRoles: Array<string> = roleStr ? roleStr.split(',') : [];
    let exist = operateRoles.some(x => x == roleId);
    if (evt.checked && !exist) {
      operateRoles.push(roleId);
    }

    if (!evt.checked && exist) {
      operateRoles = operateRoles.filter(x => x != roleId);
    }
    this._selectedRoleCount = operateRoles.length;
    this.detailForm.patchValue({ operateRoles: operateRoles.join(',') });
  }//onUserRoleCheck

  afterConfirm() {
    let data = this.detailForm.value;
    data['autoWorkFlow'] = this.autoWorkFlowCt.value;
    let source$ = this.workFlowSrv.updateWorkFlowItem(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe(res => {
      this.afterRefreshData.next(res);
    });//subscribe
  }//afterConfirm

}
