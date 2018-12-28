import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { Member } from '../models/member';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MemberService extends WebapiService<Member>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'Member';
  }//constructor
}
