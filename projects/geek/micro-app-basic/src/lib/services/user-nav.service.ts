import { Injectable } from '@angular/core';
import { UserNav } from '../models/user-nav';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { Navigation } from '../models/navigation';

@Injectable()
export class UserNavService extends WebapiService<UserNav> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'UserNav';
  }//constructor


  updateUserNavDetail(entity: any) {
    return this.httpClient.put<UserNav>(`${this.uri}/UpdateUserNavDetail`, entity, { headers: this.header });
  }//updateUserNavDetail

  deleteUserNavDetail(entity: any){
    return this.httpClient.put<UserNav>(`${this.uri}/DeleteUserNavDetail`, entity, { headers: this.header });
  }//deleteUserNavDetail

  getUserNav() {
    return this.httpClient.get<Array<Navigation>>(`${this.uri}/GetUserNav`, { headers: this.header });
  }//getUserNav
}
