import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { ClassicListViewComponent } from '../classic-list-view/classic-list-view.component';

@Component({
  selector: 'page-plate-left-drawer-list-view',
  templateUrl: './left-drawer-list-view.component.html',
  styleUrls: ['./left-drawer-list-view.component.scss']
})
export class LeftDrawerListViewComponent extends ClassicListViewComponent implements OnInit, OnDestroy {

  showDrawer = true;//drawer显示状态 true=>屉子现在为显示状态
  sideMode = 'side';
  watcher: Subscription;
  @ViewChild('drawer', { read: MatDrawer }) drawer: MatDrawer;
  constructor(protected media: ObservableMedia) {
    super();
  }//constructor

  ngOnInit() {
    super.ngOnInit();
    if (this.pageModels && this.pageModels.length > 0)
      this._currentPageModel = this.pageModels[0];


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
      }
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.watcher.unsubscribe();
  }//ngOnDestroy
}
