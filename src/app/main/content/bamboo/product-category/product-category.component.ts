import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { ProductCategory } from '../../../toolkit/models/productcategory';
import { ProductCategoryService } from '../../../toolkit/server/webapi/productcategory.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IterateCateComponent } from './iterate-cate/iterate-cate.component';
import { DessertService } from '../../services/dessert.service';
import { CategoryMdService } from './category-md.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  animations: fuseAnimations
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  organizationId: string;
  categoryType: string;
  parentId: string;
  cacheProductCategory: ProductCategory;
  categoryForm: FormGroup;
  currentCategory: ProductCategory = new ProductCategory();
  mainCategories: Array<ProductCategory> = [];
  destroy$: Subject<boolean> = new Subject();
  @ViewChild('categoryPanel', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  constructor(private categorySrv: ProductCategoryService, private formBuilder: FormBuilder, private comFactory: ComponentFactoryResolver, private dessertSrv: DessertService, private categoryMdSrv: CategoryMdService) {

    this.categoryForm = this.formBuilder.group({
      id: [''],
      organizationId: [''],
      type: [''],
      parentId: [''],
      name: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.categorySrv.getAllProductCategory(this.dessertSrv.organId).takeUntil(this.destroy$).subscribe(resCate => {
      this.cacheProductCategory = resCate;
      this.mainCategories = resCate.children ? resCate.children : [];
      this.categoryType = resCate.type;
      this.parentId = resCate.id;
    });
    this.organizationId = this.dessertSrv.organId;
    //获取一次扁平结构产品分类信息,供产品改变父分类下拉框
    this.categoryMdSrv.getAndCacheFlatProductCategories();
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


  onMainCategorySelect(id: string) {
    this.folderContainer.clear();
    this.currentCategory = this.mainCategories.filter(x => x.id === id)[0];
    let comp = this.comFactory.resolveComponentFactory(IterateCateComponent);
    let dyCom = this.folderContainer.createComponent(comp);
    dyCom.instance._ref = dyCom;
    dyCom.instance.title = this.currentCategory.name;
    dyCom.instance.categories = this.currentCategory.children;
    dyCom.instance.organizationId = this.organizationId;
    dyCom.instance.parentId = this.currentCategory.id;
    dyCom.instance.type = this.categoryType;

  }//onMainCategorySelect

}
