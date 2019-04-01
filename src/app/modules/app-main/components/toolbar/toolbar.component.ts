import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, debounceTime } from 'rxjs/operators';
import { DrawerService, LanguageService, NavRouterService, AppCacheService, NavResolverService, ProfileResolverService, AppSearchService } from 'scaffold-app-core';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {


  nickName = 'User';
  selectedLang = 'en';
  avatar: string;
  fullSearchMode = false;
  keyUp = new Subject<string>();
  destroy$ = new Subject<boolean>();
  @ViewChild('searchCt') searchCt: ElementRef;
  constructor(public drawerSrv: DrawerService, public langSrv: LanguageService, protected navRouterSrv: NavRouterService, protected appCacheSrv: AppCacheService, protected profileSrv: ProfileResolverService, protected navSrv: NavResolverService, protected searchSrv: AppSearchService) {
    this.nickName = this.appCacheSrv.nickName;
  }//constructor

  ngOnInit(): void {
    //订阅个人信息变更事件
    this.profileSrv.profile$.subscribe(profile => {
      if (!profile) return;
      this.nickName = profile.name;
      this.avatar = profile.icon;
      this.appCacheSrv.icon = profile.icon;
      this.appCacheSrv.nickName = profile.name;
    });

    this.langSrv.changeLang$.subscribe(lang => {
      let it = this.langSrv.langsDisplay.filter(x => x.key == lang)[0];
      if (it)
        this.selectedLang = it.value;
    });
    this.keyUp.pipe(map((event: any) => event.target.value)).pipe(debounceTime(500)).subscribe(keyword => {
      this.searchSrv.keyword = keyword;
    });
    this.searchSrv.closeSearch$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.closeSearch();
    });
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  viewProfile() {
    this.navRouterSrv.goto('/app-basic/profile');
  }//viewProfile

  openSearch() {
    this.fullSearchMode = true;
  }//openSearch

  closeSearch() {
    this.fullSearchMode = false;
    if (this.searchCt.nativeElement.value != '') {
      this.searchCt.nativeElement.value = '';
      this.searchSrv.keyword = '';
    }
  }//closeSearch

  logout() {
    this.navSrv.clearNavs();
    this.profileSrv.clearProfile();
    this.appCacheSrv.clear();
    this.navRouterSrv.goto('/login');
  }//logout

}
