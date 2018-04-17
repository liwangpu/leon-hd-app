import { NgModule } from '@angular/core';
import { SharedCommonModule } from './common/shared-common.module';
import { AppServiceModule } from './server/app.service.module';
import { SceneModule } from './scene/scene.module';
@NgModule({
  exports: [
    SharedCommonModule,
    AppServiceModule,
    SceneModule
  ]
})
export class ToolkitModule { }

