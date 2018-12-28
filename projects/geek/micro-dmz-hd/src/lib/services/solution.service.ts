import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { Solution } from '../models/solution';

@Injectable()
export class SolutionService extends WebapiService<Solution> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'solution';
  }//constructor

}
