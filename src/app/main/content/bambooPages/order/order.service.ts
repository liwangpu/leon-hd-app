import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConfigService } from '../../services/config.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class OrderService implements Resolve<any>
{
    routeParams: any;
    order: any;
    onOrderChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient,
        private config: ConfigService,
        private auth: AuthService
    )
    {

    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getOrder()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getOrder()
    {
        return new Promise((resolve, reject) => {
            const url = `${this.config.serverBase}/orders/${this.routeParams.id}`;
            console.log('order service get order request ' + url);
            let authOpt = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.auth.token
                })
            }
            this.http.get(url, authOpt).subscribe((response: any) =>{
                this.order = response;
                console.log(response);
                this.onOrderChanged.next(this.order);
                resolve(response);
            });
        });
    }
}