import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { V1ListViewPageBase } from 'apps-base';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';
import { DatePipe } from '@angular/common';
import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';
import { Location } from '@angular/common';
import { MemberHierarchyParamService, MemberHierarchyParam } from 'micro-dmz-oms';
import { ICommonTableColumndef, IListViewAdvanceMenu } from 'scaffold-page-plate';
import { PointExchangeRadioSettingComponent } from './point-exchange-radio-setting/point-exchange-radio-setting.component';
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
  advanceMenus: Array<IListViewAdvanceMenu> = [
    {
      name: 'button.PointExchange',
      icon: 'dns',
      needSelectedItem: false,
      permissionPoint: 'pointexchange',
      onClick: () => {
        let dialog = this.dialogFacSrv.open(PointExchangeRadioSettingComponent, {
          width: '300px',
          height: '250px'
        });
      }
    }
  ];//给个默认高级按钮
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: MemberHierarchyParamService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe, protected dialogFacSrv: DialogFactoryService, protected componentFactoryResolver: ComponentFactoryResolver) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
