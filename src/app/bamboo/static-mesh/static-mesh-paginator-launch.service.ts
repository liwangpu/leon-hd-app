import { Injectable } from '@angular/core';
import { StaticmeshService } from '../../share/services/webapis/staticmesh.service';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { PaginatorLaunch } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';

@Injectable()
export class StaticMeshPaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/staticmesh-detail';
  titleIcon = 'domain';
  title = 'glossary.StaticMesh';
  constructor(public apiSrv: StaticmeshService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService, protected dialogFac: DialogFactoryService) {
    super(datePipe, syncHandle, dialogFac);
  }//constructor
}
