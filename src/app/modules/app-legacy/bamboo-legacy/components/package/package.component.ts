import { Component, OnInit, OnDestroy } from '@angular/core';
import { PackagePaginatorLaunchService } from './package-paginator-launch.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Navigation } from '@geek/micro-app-basic';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  providers: [PackagePaginatorLaunchService]
})
export class PackageComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  constructor(public launch: PackagePaginatorLaunchService, protected route: ActivatedRoute) { }

  ngOnInit() {
    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'Package';
      let navs: Array<Navigation> = routeParam.navigations;
      if (navs && navs.length > 0) {
        let refNav = navs.filter(x => x.resource && x.resource.toLocaleLowerCase() == resource.toLocaleLowerCase())[0];
        if (refNav) {
          this.launch.titleIcon = refNav.icon;
          this.launch.title = refNav.name;
          this.launch.readDataOnly = !(refNav.permission && refNav.permission.toLocaleLowerCase().indexOf('create') > -1); 
          console.log('package nav:', refNav);
        }
      }
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy
}
