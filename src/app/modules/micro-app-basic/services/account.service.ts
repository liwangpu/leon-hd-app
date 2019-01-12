import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebapiService } from 'micro-base';
import { Md5 } from 'ts-md5';
import { AppConfigService } from '../../../app-config.service';
@Injectable()
export class AccountService extends WebapiService<Account> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'account';
  }//constructor


  /**
   * 获取用户个人信息
   */
  requestProfile(): Observable<Account> {
    return this.httpClient.get<Account>(`${this.uri}/profile`);
  }//getProfile

  updateAdditionalRole(entity: any) {
    return this.httpClient.put<any>(`${this.uri}/UpdateAdditionalRole`, entity, { headers: this.header });
  }//updateAdditionalRole

  resetPassword(entity: { userId: string, password: string }) {
    let data = {
      userId: entity.userId,
      password: Md5.hashStr(entity.password).toString()
    };
    return this.httpClient.put<any>(`${this.uri}/ResetPassword`, data, { headers: this.header });
  }//resetPassword

  changePassword(oldPassword: string, newPassword: string) {
    let data = {
      oldPassword: Md5.hashStr(oldPassword).toString(),
      newPassword: Md5.hashStr(newPassword).toString()
    };
    return this.httpClient.put(`${this.uri}/ChangePassword`, data, { headers: this.header });
  }//changePassword

}
