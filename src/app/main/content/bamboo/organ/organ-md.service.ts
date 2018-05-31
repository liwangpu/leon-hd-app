import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { OrganService } from '../../../toolkit/server/webapi/organ.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class OrganMdService extends PaginatorLaunch {

  createdUrl = 'app/organ-detail';
  titleIcon = 'device_hub';
  title = 'glossary.Organ';
  constructor(public apiSrv: OrganService, protected datePipe: DatePipe) {
    super(datePipe);
  }//constructor

}
