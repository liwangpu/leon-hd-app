import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { AssetCategory } from '../../../../../toolkit/models/assetcategory';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-category-iterate-list',
  templateUrl: './category-iterate-list.component.html',
  styleUrls: ['./category-iterate-list.component.scss']
})
export class CategoryIterateListComponent implements OnInit {

  _ref: any;
  title: string;
  categories: Array<AssetCategory> = [];
  parentId: string;
  brief: boolean;
  @ViewChild('childCategory', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  @Output() afterCategoryChange = new EventEmitter<{ parentId: string, children: Array<AssetCategory> }>();
  destroy$: Subject<boolean> = new Subject();
  constructor(private comFactory: ComponentFactoryResolver) { }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.folderContainer.clear();
  }//ngOnDestroy

  closePanel() {
    this._ref.destroy();
  }//closePanel

  openChildCategory(id: string) {
    this.folderContainer.clear();
    let curCate = this.categories.filter(x => x.id === id)[0];
    let comp = this.comFactory.resolveComponentFactory(CategoryIterateListComponent);
    let dyCom = this.folderContainer.createComponent(comp);
    dyCom.instance._ref = dyCom;
    dyCom.instance.title = curCate.name;
    dyCom.instance.categories = curCate.children;
    dyCom.instance.parentId = id;
    dyCom.instance.brief = this.brief;
    dyCom.instance.afterCategoryChange.subscribe(data => {
      curCate.children = data.children;
      if (!data.children || data.children.length <= 0)
        this.folderContainer.clear();
    });
  }//openChildCategory

  onCurrentCategoryDeleted(id: string) {
    this.folderContainer.clear();
  }//onCurrentCategoryDeleted

  afterChildrenChange(data: { parentId: string, children: Array<AssetCategory> }) {
    this.afterCategoryChange.next(data);
  }//afterChildrenChange
}
