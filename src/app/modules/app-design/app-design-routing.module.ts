import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { NavDetailComponent } from './components/nav-detail/nav-detail.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { UserNavDetailComponent } from './components/user-nav-detail/user-nav-detail.component';
import { DebuggerComponent } from './components/debugger/debugger.component';

const routes: Routes = [
  {
    path: 'debugger',
    component: DebuggerComponent
  }
  , {
    path: 'nav',
    component: NavComponent
  }
  , {
    path: 'nav-detail/:id'
    , component: NavDetailComponent
  }
  , {
    path: 'nav-detail'
    , component: NavDetailComponent
  }
  , {
    path: 'user-nav',
    component: UserNavComponent
  }
  , {
    path: 'user-nav-detail/:id'
    , component: UserNavDetailComponent
  }
  , {
    path: 'user-nav-detail'
    , component: UserNavDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDesignRoutingModule { }
