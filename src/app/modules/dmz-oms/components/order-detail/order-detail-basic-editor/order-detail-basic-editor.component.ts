import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AsyncHandleService } from 'scaffold-app-minor';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { DatePipe } from '@angular/common';
import { AppConfigService } from '../../../../../app-config.service';
import { OrderService, Order } from 'micro-dmz-oms';

@Component({
  selector: 'app-order-detail-basic-editor',
  templateUrl: './order-detail-basic-editor.component.html',
  styleUrls: ['./order-detail-basic-editor.component.scss']
})
export class OrderDetailBasicEditorComponent implements OnInit {

  currentOrderId: string;
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected orderSrv: OrderService, protected datePipeTr: DatePipe, protected appConfigSrv: AppConfigService) {

    this.detailForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      orderNo: [{ value: '', disabled: true }],
      workFlowItemName: [{ value: '', disabled: true }],
      createdTime: [{ value: '', disabled: true }],
      modifiedTime: [{ value: '', disabled: true }]
    });
  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe((data: Order) => {
      if (!data) return;
      this.currentOrderId = data.id;
      this.detailForm.patchValue({
        id: data.id,
        name: data.name,
        description: data.description,
        orderNo: data.orderNo,
        workFlowItemName: data.workFlowItemName,
        createdTime: this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd'),
        modifiedTime: this.datePipeTr.transform(data.modifiedTime, 'yyyy-MM-dd')
      });
    });//subscribe
  }//ngOnInit

  submit() {
    let data = this.detailForm.value;
    let source$ = this.orderSrv.updateBasicInfo(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe();
  }//submit

  viewDetailPage() {
    let detailViewUrl = `${this.appConfigSrv.appConfig.toolServer}/dmz-oms/order-detail?order=${this.currentOrderId}`;
    detailViewUrl = detailViewUrl.replace(/\/\//g, '/');
    detailViewUrl = detailViewUrl.replace('http:/', 'http://');
    detailViewUrl = detailViewUrl.replace('https:/', 'https://');
    window.open(detailViewUrl);
  }//viewDetailPage
}
