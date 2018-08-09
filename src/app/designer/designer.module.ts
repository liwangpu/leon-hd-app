import { NgModule } from '@angular/core';


import { DesignerRoutingModule } from './designer-routing.module';
import { BsModelComponent } from './bs-model/bs-model.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    ShareModule,
    DesignerRoutingModule
  ],
  declarations: [BsModelComponent]
})
export class DesignerModule { }
