import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { GlobalCommonService } from '../../../../service/global-common.service';
import { Subject } from 'rxjs';
import { fuseAnimations } from '../../../../../core/animations';
import { PaginatorCommonMdService } from './paginator-common-md.service';
import { Observable } from 'rxjs/Observable';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';

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
  constructor(public globalSrv: GlobalCommonService, public mdSrv: PaginatorCommonMdService) {

    // console.log('qqqqqq', this.launch.columnDefs);

  }//constructor

  ngOnInit() {
    //转移launch参数到mdSrv
    this.mdSrv.apiSvr = this.launch.apiSrv;
    this.mdSrv.createdUrl = this.launch.createdUrl;
    this.mdSrv.defaultPageSizeOption = this.launch.pageSizeOption;
    // this.mdSrv.columnDefs = this.launch.columnDefs;
    this.mdSrv.advanceMenuItems = this.launch.advanceMenuItems;
    //订阅全局搜索
    this.globalSrv.keyworkSearch$.takeUntil(this.destroy$).subscribe(key => {
      this.onKeywordSearch(key);
    });//subscribe

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

export enum ListDisplayModeEnum {
  List = 1,
  Litimg = 2
}


/**
 * 列表模板页
 */
export abstract class PaginatorLaunch {
  abstract createdUrl: string;
  abstract titleIcon: string;
  abstract title: string;
  abstract apiSrv: IListableService<Ilistable>;
  pageSizeOption = [25, 100, 500];//默认分页按钮参数
  // displayColumns = [];
  columnDefs: Array<IListTableColumn<Ilistable>> = [];
  advanceMenuItems: Array<IAdvanceMenuItem> = [];
  constructor() {
    // //初始化通用的高级按钮菜单
    // let deleteMenuItem: IAdvanceMenuItem = {
    //   icon: 'delete',
    //   name: 'button.Delete',
    //   needSelected: true,
    //   click: this.batchDelete
    // };
    // this.advanceMenuItems.push(deleteMenuItem);

    this.columnDefs = [
      // { columnDef: 'seqno', header: 'glossary.SeqNO', cell: (data) => { return `${data.seqno}`; } }
      , { columnDef: 'icon', header: '', cell: (data) => { return `${data.icon}`; } }
      , { columnDef: 'name', header: 'glossary.Name', cell: (data) => { return `${data.name}`; } }
      , { columnDef: 'description', header: 'glossary.Description', cell: (data) => { return `${data.description}`; } },
      , { columnDef: 'createdTime', header: 'glossary.CreatedTime', cell: (data) => { return `${data.createdTime}`; } }
    ];
  }//constructor

  batchDelete(idArr: Array<string>) {
    console.log('get batch items', idArr);
  }//batchDelete

  exportData() {

  }//exportData
}

export interface IAdvanceMenuItem {
  icon: string;//icon name
  name: string;//按钮的名字 经过translate
  needSelected: boolean;//按钮是否需要选中项
  click: Function;
}

export interface IListTableColumn<TData> {
  columnDef: string;
  header: string;
  width?: number;
  cell(data: TData): string;
}