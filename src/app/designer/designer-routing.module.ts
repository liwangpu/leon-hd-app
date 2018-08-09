import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BsModelComponent } from './bs-model/bs-model.component';
import { RouteguardService } from '../share/services/common/routeguard.service';
import { ListBsModelService } from '../share/services/webapis/list-bs-model.service';

const routes: Routes = [
  {
    path: 'bs-model/:model'
    , component: BsModelComponent
    , canActivate: [RouteguardService]
    , resolve: {
      model: ListBsModelService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
