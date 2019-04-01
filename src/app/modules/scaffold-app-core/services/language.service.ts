import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AppCacheService } from './app-cache.service';


@Injectable()
export class LanguageService {

  langs: Array<string> = ['cn', 'zh-tw', 'en'];
  langsDisplay: Array<{ key: string, value: string }> = [
    {
      key: 'cn',
      value: '简体'
    },
    {
      key: 'zh-tw',
      value: '繁體'
    },
    {
      key: 'en',
      value: 'English'
    }
  ];
  private _changeLang$ = new BehaviorSubject<string>(undefined);
  changeLang$ = this._changeLang$.asObservable();
  constructor(protected translate: TranslateService, protected appCacheSrv: AppCacheService) {
    //订阅语言切换设置
    this.changeLang$.subscribe(lang => {
      if (lang)
        this.translate.use(lang);
    });
  }//constructor

  set currentLang(lang: string) {
    let last = this.currentLang;
    if (lang === last)
      return;
    this._changeLang$.next(lang);
  }

  get currentLang(): string {
    return this._changeLang$.getValue();
  }
}
