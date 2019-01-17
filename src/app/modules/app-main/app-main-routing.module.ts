import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/contents/login/login.component';
import { RegisterComponent } from './components/contents/register/register.component';
import { HomeComponent } from './components/contents/home/home.component';
import { LoadingComponent } from './components/contents/loading/loading.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-in',
    component: RegisterComponent
  },
  {
    path: 'loading',
    component: LoadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMainRoutingModule { }
