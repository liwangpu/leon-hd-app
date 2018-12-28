import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductGroupPaginatorLaunchService } from './product-group-paginator-launch.service';
import { ProductGroupLeftCategoryLaunchService } from './product-group-left-category-launch.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Navigation } from '@geek/micro-app-basic';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss'],
  providers: [ProductGroupPaginatorLaunchService, ProductGroupLeftCategoryLaunchService]
})
export class ProductGroupComponent implements OnInit,OnDestroy {

  destroy$ = new Subject<boolean>();
  constructor(public launch: ProductGroupPaginatorLaunchService, public leftCategoyMdSrv: ProductGroupLeftCategoryLaunchService,protected route: ActivatedRoute) { }

  ngOnInit() {
    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'ProductGroup';
      let navs: Array<Navigation> = routeParam.navigations;
      if (navs && navs.length > 0) {
        let refNav = navs.filter(x => x.resource && x.resource.toLocaleLowerCase() == resource.toLocaleLowerCase())[0];
        if (refNav) {
          this.launch.titleIcon = refNav.icon;
          this.launch.title = refNav.name;
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
