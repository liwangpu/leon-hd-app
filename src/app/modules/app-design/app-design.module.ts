import { NgModule } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { ScaffoldPagePlateModule } from 'scaffold-page-plate';
import { ScaffoldNgBclModule } from 'scaffold-ng-bcl';
import { ScaffoldMatBclModule } from 'scaffold-mat-bcl';
import { NavDetailComponent } from './components/nav-detail/nav-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavDetailBasicEditorExComponent } from './components/nav-detail/nav-detail-basic-editor-ex/nav-detail-basic-editor-ex.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { UserNavDetailComponent } from './components/user-nav-detail/user-nav-detail.component';
import { UserNavDetailBasicEditorExComponent } from './components/user-nav-detail/user-nav-detail-basic-editor-ex/user-nav-detail-basic-editor-ex.component';
import { UserNavDetailNavDesignerEditorComponent } from './components/user-nav-detail/user-nav-detail-nav-designer-editor/user-nav-detail-nav-designer-editor.component';
import { UserNavDetailNavDesignFormComponent } from './components/user-nav-detail/user-nav-detail-nav-design-form/user-nav-detail-nav-design-form.component';
import { ScaffoldAppMinorModule } from 'scaffold-app-minor';
import { AppDesignRoutingModule } from './app-design-routing.module';
import { DebuggerComponent } from './components/debugger/debugger.component';
import { DebuggerUserSwitcherComponent } from './components/debugger/debugger-user-switcher/debugger-user-switcher.component';

@NgModule({
  declarations: [NavComponent, NavDetailComponent, NavDetailBasicEditorExComponent, UserNavComponent, UserNavDetailComponent, UserNavDetailBasicEditorExComponent, UserNavDetailNavDesignerEditorComponent, UserNavDetailNavDesignFormComponent, DebuggerComponent, DebuggerUserSwitcherComponent],
  imports: [
    TranslateModule,
    ScaffoldNgBclModule,
    ScaffoldMatBclModule,
    ScaffoldPagePlateModule,
    ScaffoldAppMinorModule,
    AppDesignRoutingModule
  ],
  entryComponents:[
    UserNavDetailNavDesignFormComponent
  ]
})
export class AppDesignModule { }
