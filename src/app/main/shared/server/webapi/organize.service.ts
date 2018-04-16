import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { ApiService, Paging } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Organize } from "../../models/organize";
@Injectable()
export class OrganizeService extends ApiService<Organize> {

    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'organ';
    }

    query(search: string, order: string, page: number, pageSize: number, orderBy: string, desc: boolean, plus?: object): Observable<Paging<Organize>> {
        return super.queryEntities(search, order, page, pageSize, orderBy, desc, plus);
    }

}