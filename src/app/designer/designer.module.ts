import { NgModule } from '@angular/core';


import { DesignerRoutingModule } from './designer-routing.module';
import { BsModelComponent } from './bs-model/bs-model.component';
import { ShareModule } from '../share/share.module';
import { NavEditComponent } from './nav-edit/nav-edit.component';

@NgModule({
  imports: [
    ShareModule,
    DesignerRoutingModule
  ],
  declarations: [BsModelComponent, NavEditComponent]
})
export class DesignerModule { }
