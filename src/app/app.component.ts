import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ViewportService } from './share/services/common/viewport.service';
import { AppCacheService } from './share/services/common/app-cache.service';
import { NavigationService } from './share/services/common/navigation.service';
import { AppLangService } from './share/services/common/app-lang.service';
import { Router } from '@angular/router';
import { DrawerService } from './share/services/common/drawer.service';
import { MatDrawer } from '@angular/material';
import { MediaService } from './share/services/common/media.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('drawer') drawerIns: MatDrawer;
  outletMaximize = true;
  constructor(protected viewPortSrv: ViewportService, protected appCacheSrv: AppCacheService, protected navSrv: NavigationService, protected router: Router, protected langSrv: AppLangService/*需要引用,因为在构造函数里面有浏览器语言检测*/, protected drawerSrv: DrawerService, protected mediaSrv: MediaService, protected media: ObservableMedia) {
    //监听设备屏幕尺寸事件
    this.media.subscribe((change: MediaChange) => {
      let alia = change ? `${change.mqAlias}` : '';
      this.mediaSrv.mqAliaChange(alia);
    });

    this.appCacheSrv.reload();
    //
    this.viewPortSrv.outletMaximize$.subscribe(max => {
      this.outletMaximize = max;
    });
    //
    this.navSrv.navigate$.subscribe(url => {
      //浏览器刷新页面时候url为空,如果这时候路由跳转会照成总是进入默认路由,而不是输入的路由
      if (!url) return;
      this.router.navigateByUrl(url);
    });
  }//constructor

  ngAfterViewInit(): void {
    //订阅屏幕尺寸响应事件
    this.mediaSrv._mqAlia$.subscribe(alia => {
      //大屏幕展开SideNav
      let showSideNavScreens = ['md', 'lg', 'xl'];
      if (showSideNavScreens.some(x => x == alia)) {
        setTimeout(() => {
          this.drawerIns.mode = 'side';
          this.drawerIns.open();

        }, 500);
      } else {
        setTimeout(() => {
          this.drawerIns.mode = 'over';
          this.drawerIns.close();
        }, 500);
      }
    });
    //订阅抽屉操作响应事件
    this.drawerSrv._toggle$.subscribe(() => {
      this.drawerIns.toggle();
    });
  }//ngAfterViewInit
}
