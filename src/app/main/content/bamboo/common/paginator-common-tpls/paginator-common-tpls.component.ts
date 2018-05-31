import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { GlobalCommonService } from '../../../../service/global-common.service';
import { Subject } from 'rxjs';
import { fuseAnimations } from '../../../../../core/animations';
import { PaginatorCommonMdService } from './paginator-common-md.service';
import { Observable } from 'rxjs/Observable';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { DatePipe } from '@angular/common';
import { DessertService } from '../../../services/dessert.service';
import { ActivatedRoute } from '@angular/router';
import { Memory } from '../../../../toolkit/memory/memory';


@Component({
  selector: 'app-paginator-common-tpls',
  templateUrl: './paginator-common-tpls.component.html',
  styleUrls: ['./paginator-common-tpls.component.scss'],
  animations: fuseAnimations,
  providers: [
    PaginatorCommonMdService
  ]
})
export class PaginatorCommonTplsComponent implements OnInit, OnDestroy {

  @Input() launch: PaginatorLaunch;
  destroy$: Subject<boolean> = new Subject();
  constructor(public globalSrv: GlobalCommonService, public mdSrv: PaginatorCommonMdService, protected dessertSrv: DessertService, public router: ActivatedRoute) {
    this.mdSrv.afterPaginatorTableContentInit$.subscribe(() => {
      this.mdSrv.columnDefs = this.launch.columnDefs;
    });
    //订阅用户个人导航信息(因为该页面的生命周期在get navigation之前)
    Memory.getInstance().afterGetNavigation$.takeUntil(this.destroy$).subscribe(() => {
      this.mdSrv.readDataOnly = !this.dessertSrv.hasDataEditPermission(this.router.snapshot.url);
    });
  }//constructor

  ngOnInit() {
    //转移launch参数到mdSrv
    this.mdSrv.apiSvr = this.launch.apiSrv;
    this.mdSrv.createdUrl = this.launch.createdUrl;
    this.mdSrv.defaultPageSizeOption = this.launch.pageSizeOption;
    this.mdSrv.advanceMenuItems = this.launch.advanceMenuItems;
    if (!this.dessertSrv.isLatestVisitPage(this.router.snapshot.url))
      this.mdSrv.displayMode = this.launch.displayMode;

    //订阅全局搜索
    this.globalSrv.keyworkSearch$.takeUntil(this.destroy$).subscribe(key => {
      this.onKeywordSearch(key);
    });//subscribe

    this.mdSrv.readDataOnly = !this.dessertSrv.hasDataEditPermission(this.router.snapshot.url);
    //执行第一次默认搜索
    this.mdSrv.queryData$.next();
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onKeywordSearch(keyword: string) {
    this.mdSrv.keyword = keyword;
  }//keywordSearch

}



/**
 * 列表模板页
 */
export abstract class PaginatorLaunch {
  abstract createdUrl: string;
  abstract titleIcon: string;
  abstract title: string;
  abstract apiSrv: IListableService<Ilistable>;
  notNeedCreate = false;//不需要前端创建数据
  displayMode: ListDisplayModeEnum = ListDisplayModeEnum.List;
  pageSizeOption = [25, 100, 500];//默认分页按钮参数
  advanceMenuItems: Array<IAdvanceMenuItem> = [];
  columnDefs: Array<IListTableColumn<Ilistable>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Ilistable) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Ilistable) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Ilistable) => data.description ? data.description : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Ilistable) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipeTr: DatePipe) {

  }//constructor

  batchDelete(idArr: Array<string>) {

  }//batchDelete

  exportData() {

  }//exportData
}

/**
 * 列表页面的显示模式
 */
export enum ListDisplayModeEnum {
  /**
   * 列
   */
  List = 1,
  /**
   * 缩略图
   */
  Litimg = 2
}


export interface IAdvanceMenuItem {
  icon: string;//icon name
  name: string;//按钮的名字 经过translate
  needSelected: boolean;//按钮是否需要选中项
  needPermission?: boolean;//是否需要权限
  click: Function;
}

export interface IListTableColumn<TData> {
  columnDef: string;
  header: string;
  width?: number;
  cell(data: TData): string;
}