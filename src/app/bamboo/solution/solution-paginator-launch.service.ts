import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { SolutionService } from '../../share/services/webapis/solution.service';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { Ilistable } from '../../share/models/ilistable';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';

@Injectable()
export class SolutionPaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/solution-detail';
  titleIcon = 'shopping_basket';
  title = 'glossary.Solution';
  constructor(public apiSrv: SolutionService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService, protected dialogFac: DialogFactoryService) {
    super(datePipe, syncHandle, dialogFac);

    this.columnDefs = [
      { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Ilistable) => data.icon ? data.icon : '' }
      , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Ilistable) => data.name ? data.name : '' }
      , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Ilistable) => data.description ? data.description : '' }
      , { columnDef: 'shareState', _columnDef: 'resourceType', header: 'glossary.ShareState', width: 70, cell: (data: Ilistable) => data.resourceType > 0 ? 'glossary.Share' : '', translate: true }
      , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 110, cell: (data: Ilistable) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
      , { columnDef: 'creatorName', header: 'glossary.CreatorName', width: 110, cell: (data: Ilistable) => data.creatorName ? data.creatorName : '' }
    ];

    this.advanceMenuItems = [this.shareDataMenuItem, this.cancelShareDataMenuItem];
  }//constructor

}
