import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { WorkFlow } from '@geek/micro-app-basic';

@Injectable()
export class OrderService extends WebapiService<Order> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'orders';
  }//constructor

  getOrganOrderFlow() {
    return this.httpClient.get<WorkFlow>(`${this.uri}/GetOrganOrderFlow`);
  }//getOrganOrderFlow

  auditOrder(data: any) {
    return this.httpClient.put<Order>(`${this.uri}/AuditOrder`, data, { headers: this.header });
  }//auditOrder

  updateCustomerMessage(data: any) {
    return this.httpClient.put<Order>(`${this.uri}/UpdateCustomerMessage`, data, { headers: this.header });
  }//updateCustomerMessage

  updateOrderDetail(data: any) {
    return this.httpClient.put<Order>(`${this.uri}/UpdateOrderDetail`, data, { headers: this.header });
  }//updateOrderDetail

}
