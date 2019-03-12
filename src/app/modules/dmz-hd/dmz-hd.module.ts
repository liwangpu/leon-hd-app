import { NgModule } from '@angular/core';
import { StaticmeshComponent } from './components/staticmesh/staticmesh.component';
import { StaticmeshDetailComponent } from './components/staticmesh-detail/staticmesh-detail.component';
import { MapComponent } from './components/map/map.component';
import { MapDetailComponent } from './components/map-detail/map-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutDetailComponent } from './components/layout-detail/layout-detail.component';
import { SolutionComponent } from './components/solution/solution.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
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
import { ScaffoldNgBclModule } from 'scaffold-ng-bcl';
import { ScaffoldMatBclModule } from 'scaffold-mat-bcl';
import { ScaffoldPagePlateModule } from 'scaffold-page-plate';
import { DmzHdRoutingModule } from './dmz-hd-routing.module';
import { ProductDetailBasicEditorExComponent } from './components/product-detail/product-detail-basic-editor-ex/product-detail-basic-editor-ex.component';
import { ProductDetailCategoryFormComponent } from './components/product-detail/product-detail-category-form/product-detail-category-form.component';
import { MaterialDetailBasicEditorExComponent } from './components/material-detail/material-detail-basic-editor-ex/material-detail-basic-editor-ex.component';
import { MaterialDetailCategoryFormComponent } from './components/material-detail/material-detail-category-form/material-detail-category-form.component';
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
import { ScaffoldAppMinorModule } from 'scaffold-app-minor';
import { ProductPackageManageComponent } from './components/product-detail/product-package-manage/product-package-manage.component';
import { ProductPackageItemComponent } from './components/product-detail/product-package-item/product-package-item.component';
import { V1PanelCategorySelectPanelComponent } from './components/common/v1-panel-category-select-panel/v1-panel-category-select-panel.component';
import { V1PanelComponentCategorySelectPanelComponent } from './components/common/v1-panel-component-category-select-panel/v1-panel-component-category-select-panel.component';
import { V1PanelAssemblyCategorySelectPanelComponent } from './components/common/v1-panel-assembly-category-select-panel/v1-panel-assembly-category-select-panel.component';




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
  declarations: [StaticmeshComponent, StaticmeshDetailComponent, MapComponent, MapDetailComponent, LayoutComponent, LayoutDetailComponent, SolutionComponent, SolutionDetailComponent, AreaTypeComponent, AreaTypeDetailComponent, MediaFileComponent, PackageComponent, ProductComponent, ProductDetailComponent, V1CategorySelectPanelComponent, V1ProductCategorySelectPanelComponent, MaterialComponent, MaterialDetailComponent, V1MaterialCategorySelectPanelComponent, ProductDetailBasicEditorExComponent, ProductDetailCategoryFormComponent, MaterialDetailBasicEditorExComponent, MaterialDetailCategoryFormComponent, ProductDetailSpecEditorComponent, ProductionCategoryComponent, V1CategoryEditorComponent, V1CategoryEditorListComponent, V1CategoryEditorFormComponent, MaterialCategoryComponent, ProductGroupCategoryComponent, PackageDetailComponent, ProductGroupComponent, ProductGroupDetailComponent, V1ProductGroupCategorySelectPanelComponent, ProductGroupDetailBasicEditorExComponent, ProductGroupDetailCategoryFormComponent, ProductPackageManageComponent, ProductPackageItemComponent, V1PanelCategorySelectPanelComponent, V1PanelComponentCategorySelectPanelComponent, V1PanelAssemblyCategorySelectPanelComponent],
  entryComponents: [
    ProductDetailCategoryFormComponent
    , MaterialDetailCategoryFormComponent
    , V1CategoryEditorFormComponent
    , ProductGroupDetailCategoryFormComponent
  ]
})
export class DmzHdModule { }
