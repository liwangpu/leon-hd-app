import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductReplaceGroupPaginatorLaunchService } from './product-replace-group-paginator-launch.service';
import { ProductLeftCategoryLaunchService } from '../product/product-left-category-launch.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Navigation } from 'micro-app-basic';

@Component({
  selector: 'app-product-replace-group',
  templateUrl: './product-replace-group.component.html',
  styleUrls: ['./product-replace-group.component.scss'],
  providers: [ProductReplaceGroupPaginatorLaunchService, ProductLeftCategoryLaunchService]
})
export class ProductReplaceGroupComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  constructor(public launch: ProductReplaceGroupPaginatorLaunchService, public leftCategoyMdSrv: ProductLeftCategoryLaunchService, protected route: ActivatedRoute) { }



  ngOnInit() {
    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'ProductReplaceGroup';
      let navs: Array<Navigation> = routeParam.navigations;
      if (navs && navs.length > 0) {
        let refNav = navs.filter(x => x.resource && x.resource.toLocaleLowerCase() == resource.toLocaleLowerCase())[0];
        if (refNav) {
          this.launch.titleIcon = refNav.icon;
          this.launch.title = refNav.name;
          this.launch.readDataOnly = !(refNav.permission && refNav.permission.toLocaleLowerCase().indexOf('create') > -1);
          console.log(123,refNav);
        }
      }
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
