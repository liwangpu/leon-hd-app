import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, ViewChildren, Query, ViewContainerRef, TemplateRef, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { DetailInfoTabComponent } from './detail-info-tab/detail-info-tab.component';
import { DetailEditScheduleService } from './detail-edit-schedule.service';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { ActivatedRoute } from '@angular/router';
import { ListableBase } from '../../../../toolkit/models/listablebase';
import { Memory } from '../../../../toolkit/memory/memory';
import { Subject } from 'rxjs';
import { DessertService } from '../../../services/dessert.service';

@Component({
  selector: 'app-detail-edit-common-tpls',
  templateUrl: './detail-edit-tpls.component.html',
  styleUrls: ['./detail-edit-tpls.component.scss'],
  providers: [DetailEditScheduleService]
})
export class DetailEditTplsComponent implements OnInit, OnDestroy, AfterContentInit {

  basicTab: DetailInfoTabComponent;
  tabs: DetailInfoTabComponent[];
  name: string;
  @Input() editOpWith: string;
  @Input() title: string;
  @Input() apiSrv: IListableService<Ilistable>;
  destroy$: Subject<boolean> = new Subject();
  @ContentChildren(DetailInfoTabComponent) inputTabs: QueryList<DetailInfoTabComponent>;

  constructor(private _location: Location, protected scheduleSrv: DetailEditScheduleService, public route: ActivatedRoute, protected dessertSrv: DessertService) {
    //订阅数据更新后事件
    this.scheduleSrv.afterDataRefresh$.subscribe(() => {
      this.name = this.scheduleSrv.currentData.name;
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

  }//ngAfterContentInit

  goback() {
    this._location.back();
  }//goback
}

