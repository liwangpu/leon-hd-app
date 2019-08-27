import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from 'scaffold-app-core'; import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { ICommonTableColumndef } from 'scaffold-page-plate';
import { MemberRegistry, MemberRegistryService } from 'micro-dmz-oms';

@Component({
  selector: 'app-member-registry',
  templateUrl: './member-registry.component.html',
  styleUrls: ['./member-registry.component.scss']
})
export class MemberRegistryComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'MemberRegistry';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , this._descriptionColumnDef
    , {
      id: 'mail', name: 'glossary.Mail', width: 120, cell: (data: MemberRegistry) => {
        return data.mail;
      }
    }
    , {
      id: 'phone', name: 'glossary.Phone', width: 100, cell: (data: MemberRegistry) => {
        return data.phone;
      }
    }
    , {
      id: 'province', name: 'glossary.Province', width: 90, cell: (data: MemberRegistry) => {
        return data.provinceName;
      }
    }
    , {
      id: 'city', name: 'glossary.City', width: 90, cell: (data: MemberRegistry) => {
        return data.cityName;
      }
    }
    , this._createdTime
  ];
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: MemberRegistryService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe,protected dialogFacSrv: DialogFactoryService) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr,dialogFacSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
