import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberRegistryComponent } from './components/member-registry/member-registry.component';
import { MemberRegistryDetailComponent } from './components/member-registry-detail/member-registry-detail.component';
import { MemberHierarchyParamComponent } from './components/member-hierarchy-param/member-hierarchy-param.component';
import { MemberHierarchyParamDetailComponent } from './components/member-hierarchy-param-detail/member-hierarchy-param-detail.component';
import { MemberComponent } from './components/member/member.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'member-registry'
    , component: MemberRegistryComponent
  }
  , {
    path: 'member-registry-detail/:id'
    , component: MemberRegistryDetailComponent
  }
  , {
    path: 'member-hierarchy-param'
    , component: MemberHierarchyParamComponent
  }
  , {
    path: 'member-hierarchy-param-detail/:id'
    , component: MemberHierarchyParamDetailComponent
  }
  , {
    path: 'member'
    , component: MemberComponent
  }
  , {
    path: 'member-detail'
    , component: MemberDetailComponent
  }
  , {
    path: 'member-detail/:id'
    , component: MemberDetailComponent
  }
  , {
    path: 'order'
    , component: OrderComponent
  }
  , {
    path: 'order-detail/:id'
    , component: OrderDetailComponent
  }
  , {
    path: 'order-detail'
    , component: OrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmzOmsRoutingModule { }
