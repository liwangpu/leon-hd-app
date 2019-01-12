import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1ListViewPageBase } from 'apps-base';
import { Member, MemberService } from 'micro-dmz-oms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';
import { AsyncHandleService } from 'scaffold-app-minor';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { ICommonTableColumndef } from 'scaffold-page-plate';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Member';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , this._descriptionColumnDef
    , {
      id: 'superior', name: 'glossary.Superior', width: 80, cell: (data: Member) => {
        return data.superiorName;
      }
    }
    , {
      id: 'mail', name: 'glossary.Mail', width: 120, cell: (data: Member) => {
        return data.mail;
      }
    }
    , {
      id: 'phone', name: 'glossary.Phone', width: 100, cell: (data: Member) => {
        return data.phone;
      }
    }
    , {
      id: 'province', name: 'glossary.Province', width: 90, cell: (data: Member) => {
        return data.provinceName;
      }
    }
    , {
      id: 'city', name: 'glossary.City', width: 90, cell: (data: Member) => {
        return data.cityName;
      }
    }
    , this._createdTime
  ];
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: MemberService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
