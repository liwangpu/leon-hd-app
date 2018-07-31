import { WebapiBaseService } from './webapi-base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '../../../../../node_modules/@angular/core';
import { Preference } from '../../models/preference';
import { of } from '../../../../../node_modules/rxjs';

@Injectable({ providedIn: 'root' })
export class PreferenceService extends WebapiBaseService {

  constructor(protected http: HttpClient) {
    super(http);
  }//constructor

  getByKey(key: string) {
    if (key) {
      return this.httpClient.get<Preference>(`${this.uri}?key=${key}`, { headers: this.header });
    }
    return of(new Preference());
  }//getByKey

  create(key: string, value: string) {
    let model = {
      key: key,
      value: value
    };
    return this.httpClient.post<Preference>(`${this.uri}`, model, { headers: this.header });
  }//create

}
