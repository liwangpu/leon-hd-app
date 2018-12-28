import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { UserRole } from '../models/user-role';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserRoleService extends WebapiService<UserRole> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'UserRole';
  }//constructor

}
