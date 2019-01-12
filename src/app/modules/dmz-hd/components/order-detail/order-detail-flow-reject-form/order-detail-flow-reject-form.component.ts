import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AsyncHandleService } from "scaffold-app-minor";
import { WorkFlowService } from 'micro-app-basic';

@Component({
  selector: 'app-order-detail-flow-reject-form',
  templateUrl: './order-detail-flow-reject-form.component.html',
  styleUrls: ['./order-detail-flow-reject-form.component.scss']
})
export class OrderDetailFlowRejectFormComponent implements OnInit, OnDestroy {

  enableConfirm = false;
  detailForm: FormGroup;
  afterRefreshData = new Subject<any>();
  constructor(protected formBuilder: FormBuilder, protected workFlowSrv: WorkFlowService, protected asyncHandleSrv: AsyncHandleService) {
    this.detailForm = this.formBuilder.group({
      remark: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.detailForm.valueChanges.subscribe((vl: { password: string, confirmPassword: string }) => {
      this.enableConfirm = this.detailForm.valid;
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterRefreshData.complete();
    this.afterRefreshData.unsubscribe();
  }//ngOnDestroy

  afterConfirm() {
    let data = this.detailForm.value;
    this.afterRefreshData.next(data);
  }//afterConfirm

}
