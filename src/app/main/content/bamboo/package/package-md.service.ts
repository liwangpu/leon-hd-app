import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { PackageService } from '../../../toolkit/server/webapi/package.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class PackageMdService extends PaginatorLaunch  {

  createdUrl = 'app/package-detail';
  titleIcon = 'extension';
  title = 'glossary.Package';
  constructor(public apiSrv: PackageService, protected datePipe: DatePipe) {
    super(datePipe);
  }//constructor

}
