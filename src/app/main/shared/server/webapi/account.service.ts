import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Account } from '../../models/Account';
@Injectable()
export class AccountService extends ApiService<Account> {

    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'account';
    }

    getNavigation() {
        let durl = `${this.uri}/navigation`;
        return this.http.get(durl, { headers: this.header })
    }
}