import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { PagedData, Product, Order } from './data.model';


@Injectable()
export class DataService
{    
    constructor(private http: HttpClient, private config: ConfigService, private auth: AuthService)
    {
    }

    
    getProducts(sort: string, order: string, page: number, pageSize: number): Observable<PagedData<Product>>
    {
        const url = `${this.config.serverBase}/products?orderby=${sort}&desc=${order}&page=${page}&pageSize=${pageSize}`;
        let authOpt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.auth.token
            })
        }
        return this.http.get<PagedData<Product>>(url, authOpt);
    }

    getOrders(sort: string, order: string, page: number, pageSize: number): Observable<PagedData<Order>>
    {
        const url = `${this.config.serverBase}/orders?orderby=${sort}&desc=${order}&page=${page}&pageSize=${pageSize}`;
        let authOpt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.auth.token
            })
        }
        return this.http.get<PagedData<Order>>(url, authOpt);
    }
}