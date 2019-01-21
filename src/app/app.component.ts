import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { CommonAppBasicNavSidebarComponent } from 'scaffold-page-plate';
import { MediaService, DrawerService, NavRouterService, LanguageService, AppCacheService, AppProgressService, WindowService } from 'scaffold-app-core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  showProgress = false;
  maximize = true;
  maxPageRouters = ['login', 'loading', 'error', 'maintenance', 'sign-in', 'debugger'];//需要app页面最大化的路由
  langs: Array<string> = ['cn', 'en'];
  @ViewChild('drawerCt') drawerCt: CommonAppBasicNavSidebarComponent;
  constructor(protected media: ObservableMedia, protected mediaSrv: MediaService, protected drawerSrv: DrawerService, protected navRouterSrv: NavRouterService, protected appCacheSrv: AppCacheService, protected translate: TranslateService, protected langSrv: LanguageService, protected progressSrv: AppProgressService, protected windowSrv: WindowService) {
    this.appCacheSrv.reload();

    //添加语言支持
    this.translate.addLangs(this.langs);
    //设置默认语言，一般在无法匹配的时候使用
    this.translate.setDefaultLang(this.langs[0]);
    //获取当前浏览器环境的语言比如en、 zh
    let broswerLang = translate.getBrowserLang();

    //服务器端渲染translate.getBrowserLang()会是undefined
    if (broswerLang) {
      let lastLang = this.appCacheSrv.lastLang;
      if (lastLang)
        broswerLang = lastLang;
      this.langSrv.currentLang = broswerLang && broswerLang.match(/en|cn/) ? broswerLang : this.langs[0];
    }//if

    //订阅路由跳转事件,以响应不同路由进行页面最大化或者抽屉模式
    this.navRouterSrv.routeChange$.subscribe(url => {
      // console.log('route to:', url);
      //忽略默认触发事件
      if (url == null) return;
      url = url ? url : "/";
      this.maximize = this.maxPageRouters.some(path => url.toLocaleLowerCase().indexOf(path.toLocaleLowerCase()) > 0);
    });//subscribe
  }//constructor

  ngOnInit() {
    //监听设备屏幕尺寸事件
    this.media.subscribe((change: MediaChange) => {
      let alia = change ? `${change.mqAlias}` : '';
      this.mediaSrv.mqAliaChange(alia);
    });//subscribe
    //订阅是否显示进度条
    this.progressSrv.showProgress$.subscribe(show => this.showProgress = show);
  }//ngOnInit

  ngAfterViewInit(): void {
    // 订阅屏幕尺寸响应事件
    this.mediaSrv.mqAlia$.subscribe(alia => {
      //大屏幕展开SideNav
      let showSideNavScreens = ['md', 'lg', 'xl'];
      if (showSideNavScreens.some(x => x == alia)) {
        setTimeout(() => {
          this.drawerCt.changeDrawerMode('side');
          this.drawerCt.openDrawer();
        }, 500);
      } else {
        setTimeout(() => {
          this.drawerCt.changeDrawerMode('over');
          this.drawerCt.closeDrawer();
        }, 500);
      }
    });//subscribe
    //订阅抽屉操作响应事件
    this.drawerSrv.toggle$.subscribe(() => {
      this.drawerCt.toggleDrawer();
    });//subscribe

    //订阅语言改变后响应事件,用于记录最近使用语言
    this.langSrv.changeLang$.subscribe(lang => {
      this.appCacheSrv.lastLang = lang;
    });//subscribe
  }//ngAfterViewInit

}
