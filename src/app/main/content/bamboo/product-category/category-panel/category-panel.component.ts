import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ComponentFactoryResolver, Input, Inject } from '@angular/core';
import { ProductCategory } from '../../../../toolkit/models/productcategory';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductCategoryService } from '../../../../toolkit/server/webapi/productcategory.service';
import { DessertService } from '../../../services/dessert.service';
import { IterateCateComponent } from '../iterate-cate/iterate-cate.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryMdService } from '../category-md.service';

@Component({
  selector: 'app-product-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.scss']
})
export class CategoryPanelComponent implements OnInit, OnDestroy {

  afterUserSelect$: Subject<ProductCategory> = new Subject();
  @Input() brief = true;
  private organizationId: string;
  private categoryType: string;
  private parentId: string;
  private cacheProductCategory: ProductCategory;
  private categoryForm: FormGroup;
  private currentCategory: ProductCategory = new ProductCategory();
  private mainCategories: Array<ProductCategory> = [];
  private destroy$: Subject<boolean> = new Subject();
  private userSelectCate: ProductCategory;//用户当前选择的分类
  @ViewChild('categoryPanel', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  @ViewChild('mainCategoryList') mainCategoryList: CategoryListComponent;
  constructor(private categorySrv: ProductCategoryService, private formBuilder: FormBuilder, private comFactory: ComponentFactoryResolver, private dessertSrv: DessertService, @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<CategoryPanelComponent>, private categoryMdSrv: CategoryMdService) {

    this.categoryForm = this.formBuilder.group({
      id: [''],
      organizationId: [''],
      type: [''],
      parentId: [''],
      name: [''],
      description: ['']
    });

    this.categoryMdSrv.afterCategorySelect$.takeUntil(this.destroy$).subscribe((resCate) => {
      this.userSelectCate = resCate;
      this.afterUserSelect$.next(resCate);
    });
  }

  ngOnInit() {
    this.categorySrv.getAllProductCategory().takeUntil(this.destroy$).subscribe(resCate => {
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

  closeDialog() {
    this.dialogRef.close();
  }//closeDialog

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
    dyCom.instance.brief = this.brief;
    this.categoryMdSrv.afterCategorySelect$.next(this.currentCategory);
  }//onMainCategorySelect

  onClear() {
    this.mainCategoryList.onClear();
    this.folderContainer.clear();
    this.userSelectCate = null;
  }//onClear

  submit() {
    this.dialogRef.close();
  }//submit

}
