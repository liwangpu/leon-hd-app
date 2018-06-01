import { Injectable } from '@angular/core';
import { PaginatorLaunch, IListTableColumn, IListableRecordMenu } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { OrganService } from '../../../toolkit/server/webapi/organ.service';
import { DatePipe } from '@angular/common';
import { Ilistable } from '../../../toolkit/models/ilistable';
import { Organization } from '../../../toolkit/models/organization';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { AccountTypeEnums } from '../../../toolkit/enums/enums';
import { AccountDetailComponent } from '../account/account-detail/account-detail.component';

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
    , { columnDef: 'typeName',_columnDef:'type', header: 'glossary.OrganType', width: 80, cell: (data: Organization) => data.typeName ? data.typeName : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Organization) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  itemManageMenu: IListableRecordMenu = {
    items: [
      { icon: 'person', name: 'button.OrganOwnerManagement', click: (data: Organization) => { this.manageOwner(data); } }
    ]
  };
  constructor(public apiSrv: OrganService, protected datePipe: DatePipe, protected dialogFac: DialogFactoryService) {
    super(datePipe);
  }//constructor

  manageOwner(data: Organization) {
    this.apiSrv.getOwner(data.id).subscribe(resAccount => {
      let owner = resAccount;
      if (!owner.id)
        owner.name = '组织管理员';
      owner.organizationId = data.id;
      owner.type = AccountTypeEnums.organAdmin;

      this.dialogFac.open(AccountDetailComponent, {
        width: '400px', height: '650px', data: {
          account: owner
        }
      });
    });//subscribe
  }//manageOwner

}
