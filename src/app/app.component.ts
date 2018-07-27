import { Component } from '@angular/core';
import { ViewportService } from './share/services/common/viewport.service';
import { AppCacheService } from './share/services/common/app-cache.service';
import { NavigationService } from './share/services/common/navigation.service';
import { AppLangService } from './share/services/common/app-lang.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  outletMaximize = true;
  constructor(protected viewPortSrv: ViewportService, protected appCacheSrv: AppCacheService, protected navSrv: NavigationService, protected router: Router, protected langSrv: AppLangService/*需要引用,因为在构造函数里面有浏览器语言检测*/) {
    this.appCacheSrv.reload();
    //
    this.viewPortSrv.outletMaximize$.subscribe(max => {
      this.outletMaximize = max;
    });
    //
    this.navSrv.navigate$.subscribe(url => {
      // console.log('goto ', url);
      //浏览器刷新页面时候url为空,如果这时候路由跳转会照成总是进入默认路由,而不是输入的路由
      if (!url) return;
      this.router.navigateByUrl(url);
    });
  }
}
