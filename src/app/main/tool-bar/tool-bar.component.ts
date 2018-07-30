import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AppCacheService } from "../../share/services/common/app-cache.service";
import { ViewportService } from "../../share/services/common/viewport.service";
import { AppLangService } from "../../share/services/common/app-lang.service";
import { GlobalSearchService } from "../../share/services/common/global-search.service";
import { Subject } from "rxjs";
import { map, debounceTime } from "rxjs/operators";
import { AccountService } from "../../share/services/webapis/account.service";
import { NavigationService } from "../../share/services/common/navigation.service";


@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  nickName = 'User';
  avatar: string;
  keyUp = new Subject<string>();
  fullSearchMode = false;
  selectedLang: string;
  @ViewChild('searchCt') searchCt: ElementRef;
  constructor(private router: Router, private appCacheSrv: AppCacheService, private viewPortSrv: ViewportService, public langSrv: AppLangService, protected globalSearchSrv: GlobalSearchService, protected accountSrv: AccountService, protected navSrv: NavigationService) {

  }//constructor

  ngOnInit() {
    //订阅个人信息变更事件
    this.accountSrv.profile$.subscribe(profile => {
      this.nickName = profile.name;
      this.avatar = profile.avatar;
    });

    this.accountSrv.getProfile().subscribe(acc => {
      this.appCacheSrv.nickName = acc.name;
      this.appCacheSrv.userId = acc.id;
      this.appCacheSrv.organId = acc.organizationId;
      this.appCacheSrv.icon = acc.avatar;
      this.appCacheSrv.role = acc.role;
    });
    this.langSrv.changeLang$.subscribe(lang => {
      this.selectedLang = lang;
    });
    this.keyUp.pipe(map((event: any) => event.target.value)).pipe(debounceTime(500)).subscribe(keyword => {
      this.globalSearchSrv.onKeyup$.next(keyword);
    });
  }//ngOnInit

  viewProfile() {
    this.router.navigateByUrl('/app/account-profile');
  }//viewProfile

  openSearch() {
    this.fullSearchMode = true;
  }//openSearch

  closeSearch() {
    this.fullSearchMode = false;
    this.searchCt.nativeElement.value = '';
    this.globalSearchSrv.onKeyup$.next('');
  }//closeSearch

  logout() {
    this.appCacheSrv.clear();
    this.navSrv._editPermission = [];
    this.viewPortSrv.outletMaximize$.next(true);
    this.router.navigateByUrl('/login');
  }//logout
}
