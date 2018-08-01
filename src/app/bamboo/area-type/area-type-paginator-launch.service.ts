import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { AreaTypeService } from '../../share/services/webapis/area-type.service';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';

@Injectable()
export class AreaTypePaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/area-type-detail';
  titleIcon = 'chrome_reader_mode';
  title = 'glossary.AreaType';
  constructor(public apiSrv: AreaTypeService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService,protected dialogFac: DialogFactoryService) {
    super(datePipe, syncHandle,dialogFac);
  }//constructor
}
