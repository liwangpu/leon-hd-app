import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { Department } from '@geek/micro-app-basic';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DepartmentService extends WebapiService<Department>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'Department';
  }//constructor
}
