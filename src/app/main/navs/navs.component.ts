import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DrawerService } from '../../share/services/common/drawer.service';
import { MediaService } from '../../share/services/common/media.service';
import { takeUntil } from 'rxjs/operators';
import { NavService } from '../../share/services/webapis/nav.service';
import { Navigation } from '../../share/models/navigation';
import { NavNodeTypeEnum } from '../../share/enums/nav-node-type.enum';
import { NavigationService } from '../../share/services/common/navigation.service';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.scss']
})
export class NavsComponent implements OnInit, OnDestroy, AfterViewInit {

  navs: Array<Navigation> = [];
  destroy$ = new Subject<boolean>();
  @ViewChild('nav') navEl: ElementRef;
  constructor(protected drawerSrv: DrawerService, protected mediaSrv: MediaService, protected renderer2: Renderer2, protected navSrv: NavService, private navRouteSrv: NavigationService) {

  }//constructor

  private _bMiniMode = false;

  ngOnInit() {
    //订阅屏幕尺寸改变事件
    this.mediaSrv._mqAlia$.pipe(takeUntil(this.destroy$)).subscribe(alia => {
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
    this.navSrv.getByRole('brandadmin').subscribe(navs => {
      this.navs = navs;
      console.log('aaaa', navs);

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
      this.navRouteSrv.navigate$.next(url);
    console.log('togo', url);
  }//activeNav


}
