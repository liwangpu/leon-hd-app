import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialService } from '@app/app-legacy';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Navigation } from '@geek/micro-app-basic';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss']
})
export class MaterialDetailComponent implements OnInit,OnDestroy {

  title: string;
  editPermission = false;
  destroy$ = new Subject<boolean>();
  constructor(public apiSrv: MaterialService, protected route: ActivatedRoute) { }

  ngOnInit() {
    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'Material';
      let navs: Array<Navigation> = routeParam.navigations;
      if (navs && navs.length > 0) {
        let refNav = navs.filter(x => x.resource && x.resource.toLocaleLowerCase() == resource.toLocaleLowerCase())[0];
        if (refNav) {
          this.title = refNav.name;
          this.editPermission = refNav.permission && refNav.permission.toLocaleLowerCase().indexOf('create') > -1;
          console.log(1234,refNav,this.editPermission);
        }
      }
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
