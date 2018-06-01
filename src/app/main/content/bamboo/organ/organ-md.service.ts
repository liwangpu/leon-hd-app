import { Injectable } from '@angular/core';
import { PaginatorLaunch, IListTableColumn, IListableRecordMenu } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { OrganService } from '../../../toolkit/server/webapi/organ.service';
import { DatePipe } from '@angular/common';
import { Ilistable } from '../../../toolkit/models/ilistable';
import { Organization } from '../../../toolkit/models/organization';

@Injectable()
export class OrganMdService extends PaginatorLaunch {

  createdUrl = 'app/organ-detail';
  titleIcon = 'device_hub';
  title = 'glossary.Organ';
  columnDefs: Array<IListTableColumn<Organization>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Organization) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Organization) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Organization) => data.description ? data.description : '' }
    , { columnDef: 'mail', header: 'glossary.Mail', width: 150, cell: (data: Organization) => data.mail ? data.mail : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Organization) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
    // , { columnDef: 'button', header: '', width: 50, cell: (data: Organization) => '' }
  ];
  itemManageMenu: IListableRecordMenu = {
    items: [
      { icon: 'person', name: '', click: (data: Organization) => { this.manageOwner(data); } }
    ]
  };
  constructor(public apiSrv: OrganService, protected datePipe: DatePipe) {
    super(datePipe);
  }//constructor

  manageOwner(data: Organization) {
    console.log('heihei', data);
  }//manageOwner

}
