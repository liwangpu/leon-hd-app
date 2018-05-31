import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { StaticmeshService } from '../../../toolkit/server/webapi/staticmesh.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class StaticmeshMdService extends PaginatorLaunch {

  createdUrl = 'app/staticmesh-detail';
  titleIcon = 'domain';
  title = 'glossary.StaticMesh';
  constructor(public apiSrv: StaticmeshService, protected datePipe: DatePipe) {
    super(datePipe);
  }//constructor

}
