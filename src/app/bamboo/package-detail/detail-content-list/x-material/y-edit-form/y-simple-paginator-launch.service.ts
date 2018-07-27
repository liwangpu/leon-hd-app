import { Injectable } from '@angular/core';
import { SimplePaginatorListBase } from '../../../../../share/common/page-tpls/simple-icon-list-page/simple-icon-list-page.component';
import { MaterialService } from '../../../../../share/services/webapis/material.service';

@Injectable()
export class YSimplePaginatorLaunchService extends SimplePaginatorListBase {

  constructor(public apiSrv: MaterialService) {
    super();
  }
}
