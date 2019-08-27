import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { ICommonTableColumndef } from 'scaffold-page-plate';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';
import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';
import { NavService, Navigation, NavNodeTypeEnum } from 'micro-app-basic';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Nav';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , this._descriptionColumnDef
    , {
      id: 'resource',
      name: 'glossary.ResourceType',
      width: 120,
      cell: (data: Navigation) => {
        return data.resource;
      }
    }
    , {
      id: 'nodeType',
      name: 'glossary.NavType',
      width: 120,
      needTranslate: true,
      cell: (data: Navigation) => {
        if (data.nodeType == NavNodeTypeEnum.Area)
          return 'glossary.NavType-Area';
        else if (data.nodeType == NavNodeTypeEnum.Group)
          return 'glossary.NavType-Group';
        else if (data.nodeType == NavNodeTypeEnum.Link)
          return 'glossary.NavType-Link';
        else
          return '';
      }
    }
    , {
      id: 'isInner',
      name: 'glossary.IsInner',
      width: 90,
      cell: (data: Navigation) => {
        return data.isInner ? '是' : '';
      }
    }
    , this._createdTime
  ];//给几个默认常用列
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: NavService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe,protected dialogSrv: DialogFactoryService) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr,dialogSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
