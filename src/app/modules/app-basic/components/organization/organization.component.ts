import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { OrganizationOwnerProfileComponent } from './organization-owner-profile/organization-owner-profile.component';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';
import { ITableListRowMenu, ICommonTableColumndef } from 'scaffold-page-plate';
import { Organization, OrganizationService } from 'micro-app-basic';
import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Organization';
  // rowMenus: Array<ITableListRowMenu> = [
  //   {
  //     id: 'organ-owner-manage', name: 'button.OrganOwnerManagement', icon: 'person', onClick: (data: any) => {
  //       this.ownerManagement(data);
  //     }
  //   }
  // ];
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , {
      id: 'organizationTypeId', name: 'glossary.OrganType', width: 80, cell: (data: Organization) => {
        return data.organizationTypeName;
      }
    }
    , this._descriptionColumnDef
    , this._createdTime
  ];
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: OrganizationService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe, protected dialogSrv: DialogFactoryService, protected componentFactoryResolver: ComponentFactoryResolver) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  ownerManagement(organ: Organization) {
    this.apiSrv.getOwner(organ.id).subscribe(data => {
      let config = {
        data: { owner: data },
        width: '450px',
        height: '545px'
      };
      this.dialogSrv.lazyModelEntryConfirm(OrganizationOwnerProfileComponent, this.componentFactoryResolver, 'dialog.EditAccount', config);
    });//subscribe
  }//ownerManagement

}
