import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { PackageService } from '../../../toolkit/server/webapi/package.service';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '../../services/async-handle.service';
import { Ilistable } from '../../../toolkit/models/ilistable';

@Injectable()
export class PackageMdService extends PaginatorLaunch {

  createdUrl = 'app/package-detail';
  titleIcon = 'extension';
  title = 'glossary.Package';
  constructor(public apiSrv: PackageService, protected datePipe: DatePipe, private syncHandle: AsyncHandleService) {
    super(datePipe);

    this.columnDefs = [
      { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Ilistable) => data.icon ? data.icon : '' }
      , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Ilistable) => data.name ? data.name : '' }
      , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Ilistable) => data.description ? data.description : '' }
      , { columnDef: 'shareState', _columnDef: 'resourceType', header: 'glossary.ShareState', width: 70, cell: (data: Ilistable) => data.resourceType > 0 ? 'glossary.Share' : '', translate: true }
      , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Ilistable) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
      , { columnDef: 'creatorName', header: 'glossary.CreatorName', width: 70, cell: (data: Ilistable) => data.creatorName ? data.creatorName : '' }
    ];

    this.advanceMenuItems = [
      { icon: 'share', name: 'button.Share', needSelected: true, click: (ids: Array<string>) => { this.shares(ids); } }
      , { icon: 'share', name: 'button.CancelShare', needSelected: true, click: (ids: Array<string>) => { this.cancelShares(ids); } }
    ];
  }//constructor

  shares(ids: Array<string>) {
    let source$ = this.apiSrv.shareDatas(ids);
    this.syncHandle.asyncRequest(source$).subscribe(_ => {
      this.refreshData$.next();
    });
  }//shareSolutions

  cancelShares(ids: Array<string>) {
    let source$ = this.apiSrv.cancelShareDatas(ids);
    this.syncHandle.asyncRequest(source$).subscribe(_ => {
      this.refreshData$.next();
    });
  }//shareSolutions

}
