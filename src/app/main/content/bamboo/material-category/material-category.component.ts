import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MaterialCategory } from '../../../toolkit/models/material-category';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { DessertService } from '../../services/dessert.service';
import { CategoryMdService } from '../product-category/category-md.service';
import { MaterialCategoryService } from '../../../toolkit/server/webapi/material-category.service';
import { IterateCateComponent } from '../product-category/iterate-cate/iterate-cate.component';

@Component({
  selector: 'app-material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.scss']
})
export class MaterialCategoryComponent implements OnInit {

  organizationId: string;
  categoryType: string;
  parentId: string;
  cacheProductCategory: MaterialCategory;
  categoryForm: FormGroup;
  currentCategory: MaterialCategory = new MaterialCategory();
  mainCategories: Array<MaterialCategory> = [];
  destroy$: Subject<boolean> = new Subject();
  @ViewChild('categoryPanel', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  constructor(private categorySrv: MaterialCategoryService, private formBuilder: FormBuilder, private comFactory: ComponentFactoryResolver, private dessertSrv: DessertService, private categoryMdSrv: CategoryMdService) {

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
    this.categorySrv.getAllMaterialCategory(this.dessertSrv.organId).takeUntil(this.destroy$).subscribe(resCate => {
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
