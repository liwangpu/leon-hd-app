import { Injectable } from '@angular/core';
import { WebapiBaseService } from './webapi-base.service';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { UserRole } from '../../models/user-role';

@Injectable({ providedIn: 'root' })
export class UserRoleService extends WebapiBaseService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'UserRole';
  }//constructor

  /**
   * 获取用户角色
   */
  getRole(organType?: string) {
    return this.httpClient.get<Array<UserRole>>(this.uri, { headers: this.header });
  }//getRole
}

// @Injectable({ providedIn: 'root' })
// export class UserRoleService  {

//   // constructor(protected httpClient: HttpClient) {
//   //   super(httpClient);
//   //   this.uriPart = 'UserRole';
//   // }//constructor

//   /**
//    * 获取用户角色
//    */
//   getRole(organType?: string) {
//     // return this.httpClient.get<Array<UserRole>>(this.uri, { headers: this.header });
//   }//getRole
// }

