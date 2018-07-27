import { Component, OnInit, OnDestroy, ContentChild, AfterContentInit, ViewChild, AfterViewInit } from '@angular/core';
import { PaginatorPageTplsComponent } from '../paginator-page-tpls/paginator-page-tpls.component';
import { PaginatorCommonMdService } from '../paginator-page-tpls/paginator-common-md.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/webapis/account.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { CategoryNavExtend } from '../category-edit-page-tpls/category-edit-refers';
import { IQueryFilter } from '../../interfaces/iqueryFilter';
import { takeUntil } from 'rxjs/operators';
import { MatDrawer } from '@angular/material';
import { NavigationService } from '../../../services/common/navigation.service';
import { GlobalSearchService } from '../../../services/common/global-search.service';

@Component({
  selector: 'app-paginator-left-category-page-tpls',
  templateUrl: './paginator-left-category-page-tpls.component.html',
  styleUrls: ['./paginator-left-category-page-tpls.component.scss'],
  providers: [
    PaginatorCommonMdService
  ]
})
export class PaginatorLeftCategoryPageTplsComponent extends PaginatorPageTplsComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {

  showDrawer = true;//drawer显示状态 true=>屉子现在为显示状态
  sideMode = 'side';
  watcher: Subscription;
  categoryName: string;
  @ViewChild('drawer', { read: MatDrawer }) drawer: MatDrawer;
  @ContentChild(CategoryNavExtend) categoryNav: CategoryNavExtend;
  constructor(protected mdSrv: PaginatorCommonMdService, protected naviSrv: NavigationService, protected router: ActivatedRoute, protected accountSrv: AccountService, public media: ObservableMedia,protected globalSearchSrv: GlobalSearchService) {
    super(mdSrv, naviSrv, router, accountSrv,globalSearchSrv);
  }

  ngOnInit() {
    super.ngOnInit();

    this.watcher = this.media.subscribe(() => {
      let largeScreen = this.media.isActive('gt-md');

      //当屉子当前处于打开,但是屏幕改变为小屏幕,需要先隐藏屉子
      if (this.showDrawer && !largeScreen)
        this.drawer.close();

      this.showDrawer = largeScreen;

      if (largeScreen)
        this.sideMode = 'side';
      else
        this.sideMode = 'push';

      this.showDrawer = largeScreen;
      if (this.showDrawer) {
        this.drawer.open();
        // this.showDrawer = false;
      }
    });
  }//ngOnInit

  ngAfterViewInit(): void {

  }//ngAfterViewInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.watcher.unsubscribe();
  }//ngOnDestroy

  ngAfterContentInit(): void {
    if (this.categoryNav) {
      this.categoryName = this.categoryNav.categoryName;
      this.categoryNav.afterCategorySelected$.pipe(takeUntil(this.destroy$)).subscribe(catid => {
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
  }//ngAfterContentInit
}
