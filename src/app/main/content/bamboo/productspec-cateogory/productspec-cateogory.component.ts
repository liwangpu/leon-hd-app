import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { ProductCategory } from '../../../toolkit/models/productcategory';
import { ProductspecCategoryService } from '../../../toolkit/server/webapi/productspec-category.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DessertService } from '../../services/dessert.service';
import { IterateCateComponent } from '../product-category/iterate-cate/iterate-cate.component';

@Component({
  selector: 'app-productspec-cateogory',
  templateUrl: './productspec-cateogory.component.html',
  styleUrls: ['./productspec-cateogory.component.scss'],
  animations: fuseAnimations
})
export class ProductspecCateogoryComponent implements OnInit, OnDestroy {
  private organizationId: string;
  private categoryType: string;
  private parentId: string;
  private cacheProductCategory: ProductCategory;
  private categoryForm: FormGroup;
  private currentCategory: ProductCategory = new ProductCategory();
  private mainCategories: Array<ProductCategory> = [];
  private destroy$: Subject<boolean> = new Subject();
  @ViewChild('categoryPanel', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  constructor(private categorySrv: ProductspecCategoryService, private formBuilder: FormBuilder, private comFactory: ComponentFactoryResolver, private dessertSrv: DessertService) {

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
