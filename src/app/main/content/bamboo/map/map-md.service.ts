import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { MapService } from '../../../toolkit/server/webapi/map.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class MapMdService extends PaginatorLaunch  {

  createdUrl = 'app/map-detail';
  titleIcon = 'map';
  title = 'glossary.Map';
  constructor(public apiSrv: MapService, protected datePipe: DatePipe) {
    super(datePipe);
  }//constructor

}
