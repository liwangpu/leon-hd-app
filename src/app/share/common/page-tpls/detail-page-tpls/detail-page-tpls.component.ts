import { Component, OnInit, OnDestroy, AfterContentInit, Input, QueryList, ContentChildren, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DetailEditMdService } from './detail-edit-md.service';
import { DetailTabBaseExtend } from './detail-edit-refers';
import { IListableService } from '../../../services/webapis/ilistableService';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListableBase } from '../../../models/listablebase';
import { Ilistable } from '../../../models/ilistable';
import { Location } from '@angular/common';
import { AccountService } from '../../../services/webapis/account.service';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../../../services/common/navigation.service';

@Component({
  selector: 'app-detail-page-tpls',
  templateUrl: './detail-page-tpls.component.html',
  styleUrls: ['./detail-page-tpls.component.scss'],
  providers: [DetailEditMdService]
})
export class DetailPageTplsComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {


  basicTab: DetailTabBaseExtend;
  tabs: DetailTabBaseExtend[];
  name: string;
  @Input() forceId: string;//有些时候,id无法通过路由请求传递,改用字段传递
  @Input() noBackup = false;
  @Input() editOpWith: string;
  @Input() title: string;
  @Input() apiSrv: IListableService<Ilistable>;
  @Output() afterIConChange = new EventEmitter<string>();//因为图标刷新发布实体的更新事件照成不必要的渲染
  destroy$ = new Subject<boolean>();
  @ContentChildren(DetailTabBaseExtend) inputTabs: QueryList<DetailTabBaseExtend>;

  constructor(private _location: Location, public scheduleSrv: DetailEditMdService, public route: ActivatedRoute, public naviSrv: NavigationService, public accountSrv: AccountService) {
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
    //订阅导航栏加载后事件,用于判断权限
    this.accountSrv.navigations$.pipe(takeUntil(this.destroy$)).subscribe(_ => {
      this.scheduleSrv.readDataOnly = !this.naviSrv.hasDataEditPermission(this.editOpWith);
      this.scheduleSrv.apiSrv = this.apiSrv;
    });
    //订阅图标更新事件
    this.scheduleSrv.afterIConChange$.subscribe(url => {
      this.afterIConChange.next(url);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  ngOnChanges(changes: SimpleChanges): void {
    let fidObj = changes['forceId'];
    if (fidObj && fidObj.currentValue) {
      this.apiSrv.getById(this.forceId).subscribe(data => {
        this.scheduleSrv.currentData = data;
      });
    }
  }//ngOnChanges

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
