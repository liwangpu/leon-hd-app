import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from 'scaffold-app-minor';
import { DatePipe } from '@angular/common';
import { OrderService } from 'micro-dmz-oms';
import { WorkFlow } from 'micro-app-basic';

@Component({
  selector: 'app-work-flow-rule-detail-basic-editor',
  templateUrl: './work-flow-rule-detail-basic-editor.component.html',
  styleUrls: ['./work-flow-rule-detail-basic-editor.component.scss']
})
export class WorkFlowRuleDetailBasicEditorComponent implements OnInit {

  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected orderSrv: OrderService, protected datePipeTr: DatePipe) {

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
    this.interactSrv.afterDataRefresh$.subscribe((data: WorkFlow) => {
      if (!data) return;

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

  }//submit

}
