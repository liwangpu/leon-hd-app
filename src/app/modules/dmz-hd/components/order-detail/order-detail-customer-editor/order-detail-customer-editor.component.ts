import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AsyncHandleService } from "scaffold-app-minor";
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { OrderService, Order } from 'micro-dmz-hd';

@Component({
  selector: 'app-order-detail-customer-editor',
  templateUrl: './order-detail-customer-editor.component.html',
  styleUrls: ['./order-detail-customer-editor.component.scss']
})
export class OrderDetailCustomerEditorComponent implements OnInit, OnDestroy {

  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected orderSrv: OrderService) {

    this.detailForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      customerPhone: ['', [Validators.required]],
      customerAddress: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe((data: Order) => {
      if (!data) return;
      this.detailForm.patchValue({
        id: data.id,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerAddress: data.customerAddress
      });
    });//subscribe

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnInit

  submit() {
    let data = this.detailForm.value;
    let source$ = this.orderSrv.updateCustomerInfo(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe();
  }//submit

}
