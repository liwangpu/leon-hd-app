import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { ProductCategory } from '../../../toolkit/models/productcategory';
import { ProductCategoryService } from '../../../toolkit/server/webapi/productcategory.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IterateCateComponent } from './iterate-cate/iterate-cate.component';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  animations: fuseAnimations
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

  private cacheProductCategory: ProductCategory;
  private categoryForm: FormGroup;
  private currentCategory: ProductCategory = new ProductCategory();
  private mainCategories: Array<ProductCategory> = [];
  private destroy$: Subject<boolean> = new Subject();
  @ViewChild('categoryPanel', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  constructor(private categorySrv: ProductCategoryService, private formBuilder: FormBuilder, private comFactory: ComponentFactoryResolver) {

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
    this.categorySrv.getAllProductCategory().takeUntil(this.destroy$).subscribe(resCate => {
      this.cacheProductCategory = resCate;
      this.mainCategories = resCate.children ? resCate.children : [];
    });
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

    // let allMainCategory = this.cacheProductCategory.children ? this.cacheProductCategory.children : [];
    // for (let idx = allMainCategory.length - 1; idx >= 0; idx--) {
    //   if (allMainCategory[idx].id === id) {
    //     this.categoryForm.patchValue(allMainCategory[idx]);
    //     break;
    //   }
    // }
  }//onMainCategorySelect

  onEditCategory(cate: ProductCategory) {

  }//onEditCategory

  onSubmitCategory() {

    // let submitAsync = () => {
    //   return new Promise((resolve, reject) => {
    //     this.categorySrv.updateProductCategory(this.categoryForm.value).takeUntil(this.destroy$).subscribe(resCate => {
    //       // console.log(111, 'juju 11', resCate);

    //       // deepForEach(this.cacheProductCategory, (value, key, subject, path) => {
    //       //   // console.log(111, 'value', value,'key',key);
    //       //   if (key === 'id') {
    //       //     if (value === resCate.id) {
    //       //     }
    //       //   }
    //       // });//deepForEach


    //     }, err => {
    //       console.log(111, 'juju 11 err', err);
    //     });
    //   });
    // };//submitAsync


    // submitAsync();

  }//onSubmitCategory
}
