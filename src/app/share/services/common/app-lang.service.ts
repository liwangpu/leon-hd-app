import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AppLangService {

  langs: Array<string> = ['cn', 'en'];
  changeLang$ = new BehaviorSubject<string>(this.langs[0]);
  constructor(protected translate: TranslateService) {
    //订阅语言切换设置
    this.changeLang$.subscribe(lang => {
      this.translate.use(lang);
    });

    //添加语言支持
    this.translate.addLangs(this.langs);
    //设置默认语言，一般在无法匹配的时候使用
    this.translate.setDefaultLang(this.langs[0]);

    //获取当前浏览器环境的语言比如en、 zh
    let broswerLang = translate.getBrowserLang();
    this.currentLang = broswerLang.match(/en|cn/) ? broswerLang : this.langs[0];
  }

  set currentLang(lang: string) {
    let last = this.currentLang;
    if (lang === last)
      return;
    this.changeLang$.next(lang);
  }

  get currentLang(): string {
    return this.changeLang$.getValue();
  }


}
