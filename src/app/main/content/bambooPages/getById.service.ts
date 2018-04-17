import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConfigService } from '../services/config.service';
import { AuthService } from "../../toolkit/server/webapi/auth.service";

@Injectable()
export class GetByIdService implements Resolve<any>
{
    obj: any;
    onOrderChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient,
        private config: ConfigService,
        private auth: AuthService
    ) {

    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let id = route.params.id;
        let apiName = route.data.apiName;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getObject(apiName, id)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getObject(apiName: string, id: string) {
        return new Promise((resolve, reject) => {
            const url = `${this.config.serverBase}/${apiName}/${id}`;
            let authOpt = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.auth.token
                })
            }
            this.http.get(url, authOpt).subscribe((response: any) => {
                this.obj = response;
                this.onOrderChanged.next(this.obj);
                resolve(response);
            });
        });
    }
}