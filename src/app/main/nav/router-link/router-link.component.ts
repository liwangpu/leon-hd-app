import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, OnChanges, SimpleChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavLink } from '../../../share/models/nav-link';
import { NavigationService } from '../../../share/services/common/navigation.service';


@Component({
  selector: 'app-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss']
})
export class RouterLinkComponent implements OnInit, OnChanges {

  expandSubLink = false;
  onRoute = false;
  @Input() subLink = false;
  @Input() icon: string;
  @Input() title: string;
  @Input() url: string;
  @Input() collapsed: boolean;
  @Input() children: Array<NavLink>;
  @Output() onRouteChange = new EventEmitter<string>();
  @ViewChild('subLinkContainer') subLinkContainer: ElementRef;
  @ViewChildren(RouterLinkComponent) subLinks: QueryList<RouterLinkComponent>;
  constructor(private navSrv: NavigationService, private renderer2: Renderer2) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let collapsedVl = changes['collapsed'];
    if (collapsedVl) {
      //折叠导航栏
      if (collapsedVl.currentValue) {
        this.expandSubLink = false;
      }
    }
  }//ngOnChanges

  onClick() {
    if (this.onRoute || (this.collapsed && this.children && this.children.length > 0))
      return;
    if (this.children && this.children.length > 0) {
      this.expandSubLink = !this.expandSubLink;

      let totalHeight = 0;
      //展开状态,计算子路由链接高度,实现transition
      if (this.expandSubLink) {
        let subLinkRouterNodes = this.subLinkContainer.nativeElement.children;
        for (let node of subLinkRouterNodes) {
          if (node.offsetHeight)
            totalHeight += node.offsetHeight;
        }
        //防止浏览器不支持offsetHeight
        if (totalHeight <= 0) {
          this.renderer2.setStyle(this.subLinkContainer.nativeElement, 'height', 'auto');
          return;
        }
      }
      this.renderer2.setStyle(this.subLinkContainer.nativeElement, 'height', totalHeight + 'px');
      return;
    }
    this.onRoute = true;
    this.onRouteChange.next(this.url);
    this.navSrv.navigate$.next(this.url);
  }//onClick

  clearRoute() {
    this.onRoute = false;
    if (this.subLinks) {
      this.expandSubLink = false;
      this.renderer2.setStyle(this.subLinkContainer.nativeElement, 'height', '0px');
      this.subLinks.forEach(x => {
        x.clearRoute();
      });
    }
  }//clearRoute

  onSubRoute(url: string) {
    this.onRoute = false;
    this.onRouteChange.next(this.url);
    this.subLinks.forEach(x => {
      if (x.url !== url)
        x.clearRoute();
    });
  }//onSubRoute
}
