import { NgModule } from '@angular/core';


import { DesignerRoutingModule } from './designer-routing.module';
import { BsModelComponent } from './bs-model/bs-model.component';
import { ShareModule } from '../share/share.module';
import { NavEditComponent } from './nav-edit/nav-edit.component';
import { OEditAreaNodeComponent as NavEditOEditAreaNodeComponent } from './nav-edit/o-edit-area-node/o-edit-area-node.component';
import { OEditLinkGroupComponent as NavEditOEditLinkGroupComponent } from './nav-edit/o-edit-link-group/o-edit-link-group.component';
import { OEditLinkComponent as NavEditOEditLinkComponent } from './nav-edit/o-edit-link/o-edit-link.component';


@NgModule({
  imports: [
    ShareModule,
    DesignerRoutingModule
  ],
  declarations: [BsModelComponent, NavEditComponent, NavEditOEditAreaNodeComponent, NavEditOEditLinkGroupComponent, NavEditOEditLinkComponent]
})
export class DesignerModule { }
