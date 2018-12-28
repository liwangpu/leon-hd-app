import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialPaginatorLaunchService } from './material-paginator-launch.service';
import { MaterialLeftCategoryLaunchService } from './material-left-category-launch.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Navigation } from '@geek/micro-app-basic';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  providers: [MaterialPaginatorLaunchService, MaterialLeftCategoryLaunchService]
})
export class MaterialComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  constructor(public launch: MaterialPaginatorLaunchService, public leftCategoyMdSrv: MaterialLeftCategoryLaunchService, protected route: ActivatedRoute) { }

  ngOnInit() {
    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'Material';
      let navs: Array<Navigation> = routeParam.navigations;
      if (navs && navs.length > 0) {
        let refNav = navs.filter(x => x.resource && x.resource.toLocaleLowerCase() == resource.toLocaleLowerCase())[0];
        if (refNav) {
          this.launch.titleIcon = refNav.icon;
          this.launch.title = refNav.name;
          this.launch.pagedModel = refNav.pagedModel ? refNav.pagedModel.split(",") : [];
          this.launch.readDataOnly = !(refNav.permission && refNav.permission.toLocaleLowerCase().indexOf('create') > -1);
        }
      }
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
