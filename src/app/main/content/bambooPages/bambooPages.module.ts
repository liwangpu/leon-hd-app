import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { ProductPageComponent } from './product/productpage.component';
import { FuseDemoModule } from '../../../core/components/demo/demo.module';
import { BambooComponentsModule } from '../bambooComponents/bambooComponents.module';
import { OrdersPageComponent } from './order/orderspage.component';
import { RouteGuardService } from '../services/routeguard.service';
import { OrderDetailComponent } from './order/orderdetail.component';
import { OrderService } from './order/order.service';
import { GetByIdService } from './getById.service';
import { ProductDetailComponent } from './product/productdetail.component';
import { CategoryPageComponent } from './category/category-page.component';
import { CustomerPageComponent } from './customer/customer-page.component';
import { LayoutPageComponent } from './layout/layout-page.component';
import { OrganPageComponent } from './organization/organ-page.component';
import { PackagePageComponent } from './package/package-page.component';
import { SupplierPageComponent } from './supplier/supplier-page.component';
import { TagsPageComponent } from './tags/tags-page.component';
import { SolutionPageComponent } from './solution/solution-page.component';
import { SolutionDetailComponent } from './solution/solution-detail.component';
import { IconsPageComponent } from './icons/icons-page.component';


const routes = [
    {
        path: 'pages/products',
        component: ProductPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/products/:id',
        component: ProductDetailComponent,
        canActivate: [RouteGuardService],
        data: { apiName: 'products' },
        resolve: {
            data: GetByIdService
        }
    },
    {
        path: 'pages/orders',
        component: OrdersPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/orders/:id',
        component: OrderDetailComponent,
        canActivate: [RouteGuardService],
        data: { apiName: 'orders' },
        resolve: {
            data: GetByIdService
        }
    },
    {
        path: 'pages/category',
        component: CategoryPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/customer',
        component: CustomerPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/layout',
        component: LayoutPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/organ',
        component: OrganPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/supplier',
        component: SupplierPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/package',
        component: PackagePageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/tags',
        component: TagsPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/solution',
        component: SolutionPageComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'pages/solution/:id',
        component: SolutionDetailComponent,
        canActivate: [RouteGuardService],
        data: { apiName: 'solution' },
        resolve: {
            data: GetByIdService
        }
    },
    {
        path: 'pages/icons',
        component: IconsPageComponent,
        canActivate: [RouteGuardService]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        FuseDemoModule,
        BambooComponentsModule
    ],
    declarations: [
        ProductPageComponent,
        OrdersPageComponent,
        OrderDetailComponent,
        ProductDetailComponent,
        CategoryPageComponent,
        CustomerPageComponent,
        LayoutPageComponent,
        OrganPageComponent,
        PackagePageComponent,
        SupplierPageComponent,
        TagsPageComponent,
        SolutionPageComponent,
        SolutionDetailComponent,
        IconsPageComponent,
        OrgandetailComponent
    ],
    exports: [
        ProductPageComponent,
        OrdersPageComponent,
        OrderDetailComponent,
        ProductDetailComponent,
        CategoryPageComponent,
        CustomerPageComponent,
        LayoutPageComponent,
        OrganPageComponent,
        PackagePageComponent,
        SupplierPageComponent,
        TagsPageComponent,
        SolutionPageComponent,
        SolutionDetailComponent,
        IconsPageComponent
    ],
    providers: [
        GetByIdService
    ]
})
export class BambooPagesModule {
}
