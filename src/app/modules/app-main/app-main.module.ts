import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/contents/login/login.component';
import { HomeComponent } from './components/contents/home/home.component';
import { RegisterComponent } from './components/contents/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ScaffoldNgBclModule } from '@geek/scaffold-ng-bcl';
import { ScaffoldMatBclModule } from '@geek/scaffold-mat-bcl';
import { ScaffoldAppMinorModule } from '@geek/scaffold-app-minor';
import { AppMainRoutingModule } from './app-main-routing.module';

@NgModule({
  imports: [
    TranslateModule,
    ScaffoldNgBclModule,
    ScaffoldMatBclModule,
    ScaffoldAppMinorModule,
    AppMainRoutingModule
  ],
  declarations: [NavbarComponent, ToolbarComponent, LoginComponent, HomeComponent, RegisterComponent],
  exports: [
    NavbarComponent, ToolbarComponent
  ]
})
export class AppMainModule { }
