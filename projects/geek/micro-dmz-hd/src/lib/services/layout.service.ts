import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { Layout } from '../models/layout';

@Injectable()
export class LayoutService extends WebapiService<Layout> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'layout';
  }//constructor

}
