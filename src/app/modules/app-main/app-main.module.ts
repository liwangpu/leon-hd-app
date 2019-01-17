import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/contents/login/login.component';
import { HomeComponent } from './components/contents/home/home.component';
import { RegisterComponent } from './components/contents/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ScaffoldNgBclModule } from 'scaffold-ng-bcl';
import { ScaffoldMatBclModule } from 'scaffold-mat-bcl';
import { ScaffoldAppMinorModule } from 'scaffold-app-minor';
import { AppMainRoutingModule } from './app-main-routing.module';
import { LoadingComponent } from './components/contents/loading/loading.component';

@NgModule({
  imports: [
    TranslateModule,
    ScaffoldNgBclModule,
    ScaffoldMatBclModule,
    ScaffoldAppMinorModule,
    AppMainRoutingModule
  ],
  declarations: [NavbarComponent, ToolbarComponent, LoginComponent, HomeComponent, RegisterComponent, LoadingComponent],
  exports: [
    NavbarComponent, ToolbarComponent
  ]
})
export class AppMainModule { }
