import { Component, OnInit } from '@angular/core';
import { MediaFileService } from '@app/app-legacy';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Navigation } from '@geek/micro-app-basic';
// import { MediaFileService } from '../../share/services/webapis/media-file.service';

@Component({
  selector: 'app-media-file-detail',
  templateUrl: './media-file-detail.component.html',
  styleUrls: ['./media-file-detail.component.scss']
})
export class MediaFileDetailComponent implements OnInit {

  title: string;
  editPermission = false;
  destroy$ = new Subject<boolean>();
  constructor(public apiSrv: MediaFileService, protected route: ActivatedRoute) { }

  ngOnInit() {
    //兼容当前nav写法
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(routeParam => {
      let resource = 'Share';
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
