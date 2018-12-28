import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1ListViewPageBase } from '@geek/apps-base';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { Location } from '@angular/common';
import { MemberHierarchyParamService, MemberHierarchyParam } from '@geek/micro-dmz-oms';
import { ICommonTableColumndef } from '@geek/scaffold-page-plate';
@Component({
  selector: 'app-member-hierarchy-param',
  templateUrl: './member-hierarchy-param.component.html',
  styleUrls: ['./member-hierarchy-param.component.scss']
})
export class MemberHierarchyParamComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'MemberHierarchyParam';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , this._descriptionColumnDef
    , {
      id: 'rate', name: 'glossary.Rate', width: 100, cell: (data: MemberHierarchyParam) => {
        return data.rate;
      }
    }
    , this._createdTime
  ];
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: MemberHierarchyParamService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
