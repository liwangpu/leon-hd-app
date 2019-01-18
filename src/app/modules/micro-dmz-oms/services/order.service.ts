import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { WorkFlow } from 'micro-app-basic';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class OrderService extends WebapiService<Order> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'orders';
  }//constructor

  getOrganOrderFlow() {
    return this.httpClient.get<WorkFlow>(`${this.uri}/GetOrganOrderFlow`);
  }//getOrganOrderFlow

  auditOrder(data: any) {
    return this.httpClient.put<Order>(`${this.uri}/AuditOrder`, data, { headers: this.header });
  }//auditOrder

  updateBasicInfo(data: any) {
    return this.httpClient.put(`${this.uri}/BasicInfo`, data, { headers: this.header });
  }//updateBasicInfo

  updateCustomerInfo(data: any) {
    return this.httpClient.put(`${this.uri}/CustomerInfo`, data, { headers: this.header });
  }//updateCustomerInfo

  updateOrderDetail(data: any) {
    return this.httpClient.put(`${this.uri}/OrderDetail`, data, { headers: this.header });
  }//updateOrderDetail

}
