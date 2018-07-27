import { Injectable } from '@angular/core';
import { WebapiBaseService } from './webapi-base.service';
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";
import { Md5 } from 'ts-md5';
import { AppCacheService } from '../common/app-cache.service';

@Injectable({ providedIn: 'root' })
export class TokenService extends WebapiBaseService {

  constructor(protected httpClient: HttpClient, protected appCacheSrv: AppCacheService) {
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
    return this.httpClient.post<TokenRespond>(this.uri, model, { headers: this.header }).pipe(tap(x => {
      this.appCacheSrv.token=x.token;
      this.appCacheSrv.tokenExpires=x.expires;
    }));
  }//requestToken

}

class TokenRespond {
  token: string;
  expires: string;
}