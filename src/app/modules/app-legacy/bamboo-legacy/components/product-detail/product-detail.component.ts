import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '@app/app-legacy';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Navigation } from 'micro-app-basic';
// import { ProductService } from '../../share/services/webapis/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  title: string;
  editPermission = false;
  destroy$ = new Subject<boolean>();
  constructor(public apiSrv: ProductService, protected route: ActivatedRoute) { }

  ngOnInit() {
    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'Product';
      let navs: Array<Navigation> = routeParam.navigations;
      if (navs && navs.length > 0) {
        let refNav = navs.filter(x => x.resource && x.resource.toLocaleLowerCase() == resource.toLocaleLowerCase())[0];
        if (refNav) {
          this.title = refNav.name;
          this.editPermission = refNav.permission && refNav.permission.toLocaleLowerCase().indexOf('create') > -1;
        }
      }
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
