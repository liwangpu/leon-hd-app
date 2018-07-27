import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { PaginatorLaunch, IListTableColumn, IListableRecordMenu } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { Organization } from '../../share/models/organization';
import { OrganService } from '../../share/services/webapis/organ.service';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { AccountTypeEnums } from '../../share/enums/enums';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';
import { XDetailComponent } from '../account/x-detail/x-detail.component';

@Injectable()
export class OrganPaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/organ-detail';
  titleIcon = 'device_hub';
  title = 'glossary.Organ';
  columnDefs: Array<IListTableColumn<Organization>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Organization) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Organization) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Organization) => data.description ? data.description : '' }
    , { columnDef: 'mail', header: 'glossary.Mail', width: 150, cell: (data: Organization) => data.mail ? data.mail : '' }
    , { columnDef: 'typeName', _columnDef: 'type', header: 'glossary.OrganType', width: 80, cell: (data: Organization) => data.typeName ? data.typeName : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 110, cell: (data: Organization) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  itemManageMenu: IListableRecordMenu = {
    items: [
      { icon: 'person', name: 'button.OrganOwnerManagement', click: (data: Organization) => { this.manageOwner(data); } }
    ]
  };
  constructor(public apiSrv: OrganService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService, protected dialogFac: DialogFactoryService, protected componentFactoryResolver: ComponentFactoryResolver) {
    super(datePipe, syncHandle);
  }//constructor

  // manageOwner() {
  manageOwner(data: Organization) {

    this.apiSrv.getOwner(data.id).subscribe(resAccount => {
      let owner = resAccount;
      if (!owner.id)
        owner.name = '组织管理员';
      owner.organizationId = data.id;
      owner.type = AccountTypeEnums.brandAdmin;

      let dialog = this.dialogFac.lazyModelEntryConfirm(XDetailComponent, this.componentFactoryResolver, 'dialog.EditAccount', { width: '450px', height: '620px', data: { account: owner, isOwner: true } });
    });//subscribe
  }//manageOwner
}
