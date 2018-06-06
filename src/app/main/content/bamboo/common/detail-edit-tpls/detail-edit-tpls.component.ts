import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { DetailInfoTabComponent } from './detail-info-tab/detail-info-tab.component';
import { DetailEditScheduleService } from './detail-edit-schedule.service';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { ActivatedRoute } from '@angular/router';
import { ListableBase } from '../../../../toolkit/models/listablebase';
import { Subject, BehaviorSubject } from 'rxjs';
import { DessertService } from '../../../services/dessert.service';


export abstract class DetailTabBaseExtend {
  isBasic: boolean;
  dataChange$: BehaviorSubject<Ilistable> = new BehaviorSubject(new ListableBase());
}


@Component({
  selector: 'app-detail-edit-common-tpls',
  templateUrl: './detail-edit-tpls.component.html',
  styleUrls: ['./detail-edit-tpls.component.scss'],
  providers: [DetailEditScheduleService]
})
export class DetailEditTplsComponent implements OnInit, OnDestroy, AfterContentInit {

  basicTab: DetailTabBaseExtend;
  tabs: DetailTabBaseExtend[];
  name: string;
  @Input() editOpWith: string;
  @Input() title: string;
  @Input() apiSrv: IListableService<Ilistable>;
  destroy$: Subject<boolean> = new Subject();
  @ContentChildren(DetailTabBaseExtend) inputTabs: QueryList<DetailTabBaseExtend>;

  constructor(private _location: Location, public scheduleSrv: DetailEditScheduleService, public route: ActivatedRoute, public dessertSrv: DessertService) {
    //订阅数据更新后事件
    this.scheduleSrv.afterDataRefresh$.subscribe(() => {
      this.name = this.scheduleSrv.currentData.name;
      if (this.inputTabs) {
        this.inputTabs.forEach(tab => {
          if (!tab.isBasic)
            tab.dataChange$.next(this.scheduleSrv.currentData);
        });
      }
    });//
    let tmp = this.route.snapshot.data.entity;
    this.scheduleSrv.currentData = tmp ? tmp : new ListableBase();
  }//constructor

  ngOnInit() {
    this.scheduleSrv.readDataOnly = !this.dessertSrv.hasDataEditPermission(this.editOpWith);
    this.scheduleSrv.apiSrv = this.apiSrv;
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  ngAfterContentInit(): void {
    let arr = this.inputTabs.toArray();
    this.tabs = arr.filter(x => !x.isBasic);
    let basic = arr.filter(x => x.isBasic);
    if (basic && basic.length > 0)
      this.basicTab = basic[0];
    this.inputTabs.forEach(tab => {
      tab.dataChange$.next(this.scheduleSrv.currentData);
    });
  }//ngAfterContentInit

  goback() {
    this._location.back();
  }//goback
}



