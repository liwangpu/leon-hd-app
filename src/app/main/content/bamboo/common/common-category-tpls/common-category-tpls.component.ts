import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { CommonCategoryService } from '../../../../toolkit/server/webapi/common-category.service';
import { CommonCategoryTplsMdService } from './common-category-tpls-md.service';
import { AssetCategory } from '../../../../toolkit/models/assetcategory';
import { CategoryIterateListComponent } from './category-iterate-list/category-iterate-list.component';
import { concat } from 'rxjs/observable/concat';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-common-category-tpls',
  templateUrl: './common-category-tpls.component.html',
  styleUrls: ['./common-category-tpls.component.scss'],
  providers: [CommonCategoryTplsMdService]
})
export class CommonCategoryTplsComponent implements OnInit, OnDestroy {


  @Input() titleName: string;
  @Input() iconName: string;
  @Input() launch: CommonCategoryTplsBase;
  @ViewChild('categoryPanel', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  dyCom: any;
  parentId: string;
  categories: Array<AssetCategory> = [];
  currentCategory: AssetCategory = new AssetCategory();
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: CommonCategoryTplsMdService, private comFactory: ComponentFactoryResolver) {

  }//constructor

  ngOnInit() {
    if (!this.launch)
      return;
    this.mdSrv.apiSrv = this.launch.apiSrv;
    // //获取第一层级分类,订阅分类改变后刷新事件
    let source$ = this.mdSrv.apiSrv.getAllAssetCategory();
    concat(source$, this.mdSrv.apiSrv.editData$).pipe(debounceTime(500)).takeUntil(this.destroy$).subscribe(res => {
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
    this.currentCategory = this.categories.filter(x => x.id === id)[0];
    let comp = this.comFactory.resolveComponentFactory(CategoryIterateListComponent);
    this.dyCom = this.folderContainer.createComponent(comp);
    this.dyCom.instance._ref = this.dyCom;
    this.dyCom.instance.title = this.currentCategory.name;
    this.dyCom.instance.categories = this.currentCategory.children;
    this.dyCom.instance.parentId = this.currentCategory.id;
  }//onMainCategorySelect

  afterChildrenChange(data: { parentId: string, children: Array<AssetCategory> }) {
    if (!data.children || data.children.length <= 0)
      this.dyCom.instance.closePanel();
  }//afterChildrenChange

}

export abstract class CommonCategoryTplsBase {
  apiSrv: CommonCategoryService;
}

