import { Injectable } from '@angular/core';
import { WebapiBaseService } from './webapi-base.service';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Navigation } from '../../models/navigation';
import { tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class NavService extends WebapiBaseService {

  userNavs$ = new BehaviorSubject<Array<Navigation>>([]);
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'navigation';
  }

  checkPermission(url: string, point: string) {
    console.log('url:', url, ",point:", point);
  }//checkPermission

  getByRole(role: string) {
    return this.httpClient.get(`${this.uri}?role=${role}`, { headers: this.header }).pipe(tap((arr: Array<Navigation>) => {
      this.userNavs$.next(arr);
    }));
  }//getByRole

  update(role: string, navs: string) {
    let entity = {
      role: role,
      navs: navs
    };
    return this.httpClient.post(`${this.uri}`, entity, { headers: this.header, responseType: 'text' });
  }//Update
}
