import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class NavRouterService {

  routeChange$ = new BehaviorSubject<string>(null);//特意设置null为默认值,不需要请忽略
  constructor(protected router: Router) {
    this.router.events.subscribe(path => {
      //一次路由改变有几个生命周期,监听最后一个即可
      if (path instanceof NavigationEnd)
        this.routeChange$.next(path.url);
    });
  }//constructor

  /**
   * 跳转路由
   * @param url 
   */
  goto(url: string, params?: any) {
    if (!params)
      this.router.navigate([url]);
    else
      this.router.navigate([url], params);
  }//goto
}
