import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { AccountService } from '../../share/services/webapis/account.service';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { NavLink } from '../../share/models/nav-link';
import { ObservableMedia } from '@angular/flex-layout';
import { RouterLinkComponent } from './router-link/router-link.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  collapsed = false;
  appName: string;
  navs: Observable<Array<Array<NavLink>>>;
  watcher: Subscription;
  destroy$ = new Subject<boolean>();
  @ViewChildren(RouterLinkComponent) links: QueryList<RouterLinkComponent>;
  constructor(private accountSrv: AccountService, protected media: ObservableMedia) {

  }//constructor

  ngOnInit() {
    this.watcher = this.media.subscribe(() => {
      this.collapsed = !this.media.isActive('gt-md');
    });
    this.accountSrv.getNavigation().subscribe(data => {
      this.navs = of(data['model']) as Observable<Array<Array<NavLink>>>;
    });
    this.accountSrv.profile$.subscribe(profile => {
      this.appName = profile.organization;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.watcher.unsubscribe();
  }//ngOnDestroy

  toggleNav() {
    this.collapsed = !this.collapsed;
  }//toggleNav

  onRouteChange(url: string) {
    this.links.forEach(x => {
      if (x.url !== url)
        x.clearRoute();
    });
  }//onRouteChange
}
