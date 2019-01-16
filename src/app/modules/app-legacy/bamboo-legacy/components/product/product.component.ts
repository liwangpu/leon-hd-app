import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductPaginatorLaunchService } from './product-paginator-launch.service';
import { ProductLeftCategoryLaunchService } from './product-left-category-launch.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AccountService ,AccountTypeEnums} from '@app/app-legacy';
import { Navigation } from 'micro-app-basic';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [
    ProductPaginatorLaunchService, ProductLeftCategoryLaunchService
  ]
})
export class ProductComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  constructor(public launch: ProductPaginatorLaunchService, public leftCategoyMdSrv: ProductLeftCategoryLaunchService, protected accountSrv: AccountService, protected route: ActivatedRoute) { }

  ngOnInit() {
    //订阅个人信息变更事件
    this.accountSrv.profile$.subscribe(profile => {

      if (profile.role == AccountTypeEnums.brandAdmin || profile.role == AccountTypeEnums.brandMember) {
        this.launch.showHideColumn$.next(['purchasePrice', 'partnerPrice']);
      }
      else if (profile.role == AccountTypeEnums.partnerAdmin || profile.role == AccountTypeEnums.partnerMember) {
        this.launch.showHideColumn$.next(['partnerPrice']);
      }
      else { }
    });//subscribe

    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'Product';
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
