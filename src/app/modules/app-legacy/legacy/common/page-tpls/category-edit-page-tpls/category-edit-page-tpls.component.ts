import { Component, OnInit, OnDestroy, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CommonCategoryTplsMdService } from './common-category-tpls-md.service';
import { CommonCategoryTplsBase } from './category-edit-refers';
import { AssetCategory } from '../../../models/assetcategory';
import { Subject, concat } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CategoryIterateListComponent } from './category-iterate-list/category-iterate-list.component';

@Component({
  selector: 'app-category-edit-page-tpls',
  templateUrl: './category-edit-page-tpls.component.html',
  styleUrls: ['./category-edit-page-tpls.component.scss'],
  providers: [CommonCategoryTplsMdService]
})
export class CategoryEditPageTplsComponent implements OnInit, OnDestroy {

  @Input() titleName: string;
  @Input() iconName: string;
  @Input() launch: CommonCategoryTplsBase;
  @ViewChild('categoryPanel', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  parentId: string;
  categories: Array<AssetCategory> = [];
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: CommonCategoryTplsMdService, private comFactory: ComponentFactoryResolver) {

  }//constructor

  ngOnInit() {
    if (!this.launch)
      return;
    this.mdSrv.apiSrv = this.launch.apiSrv;
    // //获取第一层级分类,订阅分类改变后刷新事件
    let source$ = this.mdSrv.apiSrv.getAllAssetCategory();
    concat(source$, this.mdSrv.apiSrv.editData$).pipe(debounceTime(500)).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.categories = res.children ? res.children : [];
      this.parentId = res.id;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onMainCategorySelect(id: string) {
    this.folderContainer.clear();
    let currentCategory = this.categories.filter(x => x.id === id)[0];
    if (!currentCategory)
      return;
    let comp = this.comFactory.resolveComponentFactory(CategoryIterateListComponent);
    let dyCom = this.folderContainer.createComponent(comp);
    dyCom.instance._ref = dyCom;
    dyCom.instance.title = currentCategory.name;
    dyCom.instance.categories = currentCategory.children;
    dyCom.instance.parentId = currentCategory.id;
    dyCom.instance.afterCategoryChange.subscribe(data => {
      currentCategory.children = data.children;
      if (!data.children || data.children.length <= 0)
        this.folderContainer.clear();
    });
  }//onMainCategorySelect

  onMainCategoryDeleted(data: { parentId: string, children: Array<AssetCategory> }) {
    this.categories = data.children;
    this.folderContainer.clear();
  }//onCurrentCategoryDeleted


}
