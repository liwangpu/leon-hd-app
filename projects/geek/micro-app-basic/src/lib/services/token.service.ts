import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { WebapiBaseService } from '@geek/micro-base';

@Injectable()
export class TokenService extends WebapiBaseService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'token';
  }

  /**
   * 请求token
   * @param userName 
   * @param password 
   */
  requestToken(userName: string, password: string) {
    let md5pwd = Md5.hashStr(password).toString();
    let model = {
      account: userName,
      password: md5pwd
    }
    return this.httpClient.post<{ token: string, expires: string }>(this.uri, model, { headers: this.header });
  }//requestToken
}
