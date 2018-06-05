import { Component, OnInit, Input, OnDestroy, ContentChild, AfterContentInit } from '@angular/core';
import { fuseAnimations } from '../../../../../core/animations';
import { PaginatorLaunch } from '../paginator-common-tpls/paginator-common-tpls.component';
import { Subject } from 'rxjs';
import { DessertService } from '../../../services/dessert.service';
import { PaginatorCommonMdService } from '../paginator-common-tpls/paginator-common-md.service';
import { GlobalCommonService } from '../../../../service/global-common.service';
import { ActivatedRoute } from '@angular/router';
import { Memory } from '../../../../toolkit/memory/memory';
import { IQueryFilter } from '../../../../toolkit/common/interfaces/iqueryFilter';


export abstract class CategoryNavExtend {
  abstract categoryName: string;
  afterCategorySelected$: Subject<string> = new Subject();
}


@Component({
  selector: 'app-paginator-left-category-common-tpls',
  templateUrl: './paginator-left-category-common-tpls.component.html',
  styleUrls: ['./paginator-left-category-common-tpls.component.scss'],
  animations: fuseAnimations,
  providers: [
    PaginatorCommonMdService
  ]
})
export class PaginatorLeftCategoryCommonTplsComponent implements OnInit, OnDestroy, AfterContentInit {

  categoryName: string;
  @Input() launch: PaginatorLaunch;
  @ContentChild(CategoryNavExtend) categoryNav: CategoryNavExtend;
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
    this.mdSrv.itemManageMenu = this.launch.itemManageMenu;
    if (!this.dessertSrv.isLatestVisitPage(this.router.snapshot.url))
      this.mdSrv.displayMode = this.launch.displayMode;
      this.launch.refreshData$.takeUntil(this.destroy$).subscribe(() => {
        this.mdSrv.query();
      });
  
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

  ngAfterContentInit(): void {
    if (this.categoryNav) {
      this.categoryName = this.categoryNav.categoryName;
      this.categoryNav.afterCategorySelected$.takeUntil(this.destroy$).subscribe(catid => {
        let query: IQueryFilter = { field: 'categoryId', value: catid };
        if (catid) {
          this.mdSrv.advanceQuery(query);
        }
        else {
          let queryEx: IQueryFilter = { field: 'classify', value: 'false' };
          this.mdSrv.advanceQuery([query, queryEx]);
        }
      });
    }
  }

  onKeywordSearch(keyword: string) {
    this.mdSrv.keyword = keyword;
  }//keywordSearch

}
