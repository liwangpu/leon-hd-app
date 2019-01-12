import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { AppCacheService } from './services/app-cache.service';
import { AppEncryptionService } from './services/app-encryption.service';
import { AppProgressService } from './services/app-progress.service';
import { AppSearchService } from './services/app-search.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { LocalStoreService } from './services/local-store.service';
import { WindowService } from './services/window.service';
import { DatePipe } from '@angular/common';
import { RouteGuardService } from './services/route-guard.service';
import { NavRouterService } from './services/nav-router.service';
import { LanguageService } from './services/language.service';
import { ProfileResolverService } from './services/profile-resolver.service';
import { NavResolverService } from './services/nav-resolver.service';
import { DrawerService } from './services/drawer.service';
import { MediaService } from './services/media.service';


@NgModule({
  providers: [
    DatePipe,
    AppCacheService,
    AppEncryptionService,
    AppProgressService,
    AppSearchService,
    AuthInterceptorService,
    ErrorInterceptorService,
    LocalStoreService,
    WindowService,
    RouteGuardService,
    NavRouterService,
    LanguageService, 
    ProfileResolverService,
    NavResolverService,
    DrawerService,
    MediaService
  ]
})
export class ScaffoldAppCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: ScaffoldAppCoreModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScaffoldAppCoreModule
    };
  }//forRoot

}
