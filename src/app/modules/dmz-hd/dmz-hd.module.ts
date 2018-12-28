import { NgModule } from '@angular/core';
import { StaticmeshComponent } from './components/staticmesh/staticmesh.component';
import { StaticmeshDetailComponent } from './components/staticmesh-detail/staticmesh-detail.component';
import { MapComponent } from './components/map/map.component';
import { MapDetailComponent } from './components/map-detail/map-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutDetailComponent } from './components/layout-detail/layout-detail.component';
import { SolutionComponent } from './components/solution/solution.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { AreaTypeComponent } from './components/area-type/area-type.component';
import { AreaTypeDetailComponent } from './components/area-type-detail/area-type-detail.component';
import { MediaFileComponent } from './components/media-file/media-file.component';
import { TranslateModule } from '@ngx-translate/core';
import { PackageComponent } from './components/package/package.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { V1CategorySelectPanelComponent } from './components/common/v1-category-select-panel/v1-category-select-panel.component';
import { TreeModule } from 'ng2-tree';
import { V1ProductCategorySelectPanelComponent } from './components/common/v1-product-category-select-panel/v1-product-category-select-panel.component';
import { MaterialComponent } from './components/material/material.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { V1MaterialCategorySelectPanelComponent } from './components/common/v1-material-category-select-panel/v1-material-category-select-panel.component';
import { ScaffoldNgBclModule } from '@geek/scaffold-ng-bcl';
import { ScaffoldMatBclModule } from '@geek/scaffold-mat-bcl';
import { ScaffoldPagePlateModule } from '@geek/scaffold-page-plate';
import { DmzHdRoutingModule } from './dmz-hd-routing.module';
import { ProductDetailBasicEditorExComponent } from './components/product-detail/product-detail-basic-editor-ex/product-detail-basic-editor-ex.component';
import { ProductDetailCategoryFormComponent } from './components/product-detail/product-detail-category-form/product-detail-category-form.component';
import { MaterialDetailBasicEditorExComponent } from './components/material-detail/material-detail-basic-editor-ex/material-detail-basic-editor-ex.component';
import { MaterialDetailCategoryFormComponent } from './components/material-detail/material-detail-category-form/material-detail-category-form.component';
import { OrderDetailListEditorComponent } from './components/order-detail/order-detail-list-editor/order-detail-list-editor.component';
import { ScaffoldAppMinorModule } from '@geek/scaffold-app-minor';
import { OrderDetailWorkflowEditorComponent } from './components/order-detail/order-detail-workflow-editor/order-detail-workflow-editor.component';
import { OrderDetailBasicEditorExComponent } from './components/order-detail/order-detail-basic-editor-ex/order-detail-basic-editor-ex.component';
import { OrderDetailFlowRejectFormComponent } from './components/order-detail/order-detail-flow-reject-form/order-detail-flow-reject-form.component';
import { OrderDetailCustomerEditorComponent } from './components/order-detail/order-detail-customer-editor/order-detail-customer-editor.component';
import { OrderDetailListItemFormComponent } from './components/order-detail/order-detail-list-item-form/order-detail-list-item-form.component';
import { ProductDetailSpecEditorComponent } from './components/product-detail/product-detail-spec-editor/product-detail-spec-editor.component';
import { ProductionCategoryComponent } from './components/production-category/production-category.component';
import { V1CategoryEditorComponent } from './components/common/v1-category-editor/v1-category-editor.component';
import { V1CategoryEditorListComponent } from './components/common/v1-category-editor/v1-category-editor-list/v1-category-editor-list.component';
import { V1CategoryEditorFormComponent } from './components/common/v1-category-editor/v1-category-editor-form/v1-category-editor-form.component';
import { MaterialCategoryComponent } from './components/material-category/material-category.component';
import { ProductGroupCategoryComponent } from './components/product-group-category/product-group-category.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { ProductGroupComponent } from './components/product-group/product-group.component';
import { ProductGroupDetailComponent } from './components/product-group-detail/product-group-detail.component';
import { V1ProductGroupCategorySelectPanelComponent } from './components/common/v1-product-group-category-select-panel/v1-product-group-category-select-panel.component';
import { ProductGroupDetailBasicEditorExComponent } from './components/product-group-detail/product-group-detail-basic-editor-ex/product-group-detail-basic-editor-ex.component';
import { ProductGroupDetailCategoryFormComponent } from './components/product-group-detail/product-group-detail-category-form/product-group-detail-category-form.component';

@NgModule({
  imports: [
    ScaffoldNgBclModule,
    TranslateModule,
    ScaffoldMatBclModule,
    TreeModule,
    ScaffoldAppMinorModule,
    ScaffoldPagePlateModule,
    DmzHdRoutingModule
  ],
  declarations: [StaticmeshComponent, StaticmeshDetailComponent, MapComponent, MapDetailComponent, LayoutComponent, LayoutDetailComponent, SolutionComponent, SolutionDetailComponent, OrderComponent, OrderDetailComponent, AreaTypeComponent, AreaTypeDetailComponent, MediaFileComponent, PackageComponent, ProductComponent, ProductDetailComponent, V1CategorySelectPanelComponent, V1ProductCategorySelectPanelComponent, MaterialComponent, MaterialDetailComponent, V1MaterialCategorySelectPanelComponent, ProductDetailBasicEditorExComponent, ProductDetailCategoryFormComponent, MaterialDetailBasicEditorExComponent, MaterialDetailCategoryFormComponent, OrderDetailListEditorComponent, OrderDetailWorkflowEditorComponent, OrderDetailBasicEditorExComponent, OrderDetailFlowRejectFormComponent, OrderDetailCustomerEditorComponent, OrderDetailListItemFormComponent, ProductDetailSpecEditorComponent, ProductionCategoryComponent, V1CategoryEditorComponent, V1CategoryEditorListComponent, V1CategoryEditorFormComponent, MaterialCategoryComponent, ProductGroupCategoryComponent, PackageDetailComponent, ProductGroupComponent, ProductGroupDetailComponent, V1ProductGroupCategorySelectPanelComponent, ProductGroupDetailBasicEditorExComponent, ProductGroupDetailCategoryFormComponent],
  entryComponents: [
    ProductDetailCategoryFormComponent
    , MaterialDetailCategoryFormComponent
    , OrderDetailFlowRejectFormComponent
    , OrderDetailListItemFormComponent
    , V1CategoryEditorFormComponent
    , ProductGroupDetailCategoryFormComponent
  ]
})
export class DmzHdModule { }
