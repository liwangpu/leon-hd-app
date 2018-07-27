import { Component, OnInit, Input } from '@angular/core';
import { PaginatorLaunch } from './paginator-refers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PaginatorCommonMdService } from './paginator-common-md.service';
import { AccountService } from '../../../services/webapis/account.service';
import { NavigationService } from '../../../services/common/navigation.service';
import { GlobalSearchService } from '../../../services/common/global-search.service';

@Component({
  selector: 'app-paginator-page-tpls',
  templateUrl: './paginator-page-tpls.component.html',
  styleUrls: ['./paginator-page-tpls.component.scss'],
  providers: [
    PaginatorCommonMdService
  ]
})
export class PaginatorPageTplsComponent implements OnInit {

  @Input() launch: PaginatorLaunch;
  destroy$ = new Subject<boolean>();
  constructor(protected mdSrv: PaginatorCommonMdService, protected navSrv: NavigationService, protected router: ActivatedRoute, protected accountSrv: AccountService, protected globalSearchSrv: GlobalSearchService) {
  }//constructor

  ngOnInit() {
    //转移launch参数到mdSrv
    this.mdSrv.apiSvr = this.launch.apiSrv;
    this.mdSrv.createdUrl = this.launch.createdUrl;
    this.mdSrv.defaultPageSizeOption = this.launch.pageSizeOption;
    this.mdSrv.advanceMenuItems = this.launch.advanceMenuItems;
    this.mdSrv.itemManageMenu = this.launch.itemManageMenu;
    this.mdSrv.enableDisplayModes = this.launch.enableDisplayModes;
    this.mdSrv.createdAction = this.launch.createdAction;
    this.mdSrv.columnDefs = this.launch.columnDefs;
    if (!this.navSrv.isLatestVisitPage(this.router.snapshot.url))
      this.mdSrv.displayMode = this.launch.displayMode;
    this.launch.refreshData$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.mdSrv.query();
    });

    this.launch.showHideColumn$.subscribe(cols => {
      this.mdSrv.showHideColumn$.next(cols);
    });
    //订阅导航栏加载后事件,用于判断权限
    this.accountSrv.navigations$.pipe(takeUntil(this.destroy$)).subscribe(_ => {
      this.mdSrv.readDataOnly = !this.navSrv.hasDataEditPermission(this.router.snapshot.url);
    });
    //执行第一次默认搜索
    this.mdSrv.queryData$.next();
    //订阅全局搜索
    this.globalSearchSrv.onKeyup$.pipe(takeUntil(this.destroy$)).subscribe(keyword => {
      this.mdSrv.keyword = keyword;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onKeywordSearch(keyword: string) {
    this.mdSrv.keyword = keyword;
  }//keywordSearch

}
