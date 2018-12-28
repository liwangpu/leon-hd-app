import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DrawerService, MediaService, NavResolverService, NavRouterService, ProfileResolverService } from '@geek/scaffold-app-core';
import { Navigation, NavNodeTypeEnum } from '@geek/micro-app-basic';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  organName: string = "竹烛科技";
  organIcon: string;
  navs: Array<Navigation> = [];
  destroy$ = new Subject<boolean>();
  @ViewChild('nav') navEl: ElementRef;
  constructor(protected drawerSrv: DrawerService, protected mediaSrv: MediaService, protected renderer2: Renderer2, protected navSrv: NavResolverService, protected navRouteSrv: NavRouterService, protected profileSrv: ProfileResolverService) {

  }//constructor

  private _bMiniMode = false;

  ngOnInit() {
    //订阅屏幕尺寸改变事件
    this.mediaSrv.mqAlia$.pipe(takeUntil(this.destroy$)).subscribe(alia => {
      if (alia == 'md') {
        this._bMiniMode = true;
        this.renderer2.addClass(this.navEl.nativeElement, 'mini');
      }
      else {
        this._bMiniMode = false;
        this.renderer2.removeClass(this.navEl.nativeElement, 'mini');
      }
    });
    //获取用户导航信息
    this.navSrv.navs$.pipe(takeUntil(this.destroy$)).subscribe(navs => {
      this.navs = navs;
    });
    //订阅个人信息变更事件
    this.profileSrv.profile$.subscribe(profile => {
      if (!profile) return;
      if (profile.organizationId)
        this.organName = profile.organizationName;
      this.organIcon = profile.organizationIcon;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  ngAfterViewInit(): void {

  }//ngAfterViewInit

  toggleSideNavMiniMode() {
    this._bMiniMode = !this._bMiniMode;
    if (this._bMiniMode)
      this.renderer2.addClass(this.navEl.nativeElement, 'mini');
    else
      this.renderer2.removeClass(this.navEl.nativeElement, 'mini');
  }

  closeSideNav() {
    this.drawerSrv.toggle();
  }//closeSideNav

  onMouseEnterSideNav() {
    if (!this._bMiniMode) return;
    this.renderer2.addClass(this.navEl.nativeElement, 'actived');
  }//onMouseEnterSideNav

  onMouseLeaveSideNav() {
    if (!this._bMiniMode) return;
    this.renderer2.removeClass(this.navEl.nativeElement, 'actived');
  }//onMouseLeaveSideNav

  activeNav(id: string, url?: string) {
    //将路由转为小写
    if (url)
      url = url.toLocaleLowerCase();
    //如果是多路由,截取第一个作为跳转路由
    if (url && url.indexOf(',') > 0)
      url = url.substring(0, url.indexOf(','));

    let bIsLinkNode = false;
    for (let idx = this.navs.length - 1; idx >= 0; idx--) {
      let item = this.navs[idx];
      if (item.id == id) {
        //group节点
        if (item.nodeType == NavNodeTypeEnum.Group) {
          item.actived = !item.actived;
          return;
        }
        //link节点
        if (item.nodeType == NavNodeTypeEnum.Link) {
          item.actived = true;
          bIsLinkNode = true;
        }
        break;
      }
    }//for
    //如果激活的是link节点,遍历取消激活其他节点
    for (let idx = this.navs.length - 1; idx >= 0; idx--) {
      let item = this.navs[idx];
      if (item.nodeType == NavNodeTypeEnum.Link && item.id != id) {
        item.actived = false;
      }
    }//for
    if (url)
      this.navRouteSrv.goto(url);
  }//activeNav
}
