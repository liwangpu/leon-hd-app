import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
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
export class PaginatorCommonTplsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() iconName: string;//列表图标名称
  @Input() pageTitle: string = 'Default';//页面标题(会经过translate pipe)
  @Input() createdUrl: string;//新建项请求路由
  @Input() readDataOnly: boolean;//列表页面模式 true为查看模式,没有新增/编辑等管理按钮
  @Input() dataDisplayMode: ListDisplayModeEnum = ListDisplayModeEnum.List;//列表数据显示模式 列表或卡片等等
  @Input() apiSvr: IListableService<Ilistable>;
  destroy$: Subject<boolean> = new Subject();
  constructor(public globalSrv: GlobalCommonService, public mdSrv: PaginatorCommonMdService) {

    //订阅全局搜索
    this.globalSrv.keyworkSearch$.takeUntil(this.destroy$).subscribe(key => {
      this.onKeywordSearch(key);
    });//subscribe


  }//constructor

  ngOnInit() {
    this.mdSrv.createdUrl = this.createdUrl;
    this.mdSrv.apiSvr = this.apiSvr;
    this.mdSrv.queryData$.next();
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  ngOnChanges(changes: SimpleChanges): void {
    let readDataOnlyChange = changes['readDataOnly'];
    if (readDataOnlyChange) {
      if (readDataOnlyChange.previousValue !== readDataOnlyChange.currentValue)
        this.mdSrv.readDataOnly = readDataOnlyChange.currentValue;
    }//if
  }//ngOnChanges

  onKeywordSearch(keyword: string) {
    this.mdSrv.keyword = keyword;
  }//keywordSearch

}

export enum ListDisplayModeEnum {
  List = 1,
  Litimg = 2
}
