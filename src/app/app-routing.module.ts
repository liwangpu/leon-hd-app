import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService, NavResolverService, ProfileResolverService } from 'scaffold-app-core';
import { HomeComponent } from './modules/app-main/components/contents/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RouteGuardService],
    resolve: {
      navigations: NavResolverService
      , profile: ProfileResolverService
    }
  }
  , {
    path: 'app-design',
    canActivate: [RouteGuardService],
    resolve: {
      navigations: NavResolverService
      , profile: ProfileResolverService
    },
    loadChildren: './modules/app-design/app-design.module#AppDesignModule'
  }
  , {
    path: 'app-basic',
    canActivate: [RouteGuardService],
    resolve: {
      navigations: NavResolverService
      , profile: ProfileResolverService
    },
    loadChildren: './modules/app-basic/app-basic.module#AppBasicModule'
  }
  , {
    path: 'dmz-hd',
    canActivate: [RouteGuardService],
    resolve: {
      navigations: NavResolverService
      , profile: ProfileResolverService
    },
    loadChildren: './modules/dmz-hd/dmz-hd.module#DmzHdModule'
  }
  , {
    path: 'dmz-oms',
    canActivate: [RouteGuardService],
    resolve: {
      navigations: NavResolverService
      , profile: ProfileResolverService
    },
    loadChildren: './modules/dmz-oms/dmz-oms.module#DmzOmsModule'
  }
  // , {
  //   path: 'dmz-hd-lgc',
  //   canActivate: [RouteGuardService],
  //   resolve: {
  //     navigations: NavResolverService
  //     , profile: ProfileResolverService
  //   },
  //   loadChildren: './modules/app-legacy/bamboo-legacy/bamboo-legacy.module#BambooLegacyModule'
  // }
  , { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
