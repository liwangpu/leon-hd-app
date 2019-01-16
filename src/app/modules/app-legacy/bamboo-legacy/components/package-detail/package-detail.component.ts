import { Component, OnInit, OnDestroy } from '@angular/core';
// import { PackageService } from '../../share/services/webapis/package.service';
import { PackageDetailMdService } from './package-detail-md.service';
import { PackageService } from '@app/app-legacy';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Navigation } from 'micro-app-basic';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss'],
  providers: [PackageDetailMdService]
})
export class PackageDetailComponent implements OnInit, OnDestroy {

  title: string;
  editPermission = false;
  destroy$ = new Subject<boolean>();
  constructor(public apiSrv: PackageService, protected route: ActivatedRoute) { }

  ngOnInit() {
    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'Package';
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
