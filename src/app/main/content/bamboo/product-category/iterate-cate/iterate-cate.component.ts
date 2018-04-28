import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductCategory } from '../../../../toolkit/models/productcategory';

@Component({
  selector: 'app-iterate-cate',
  templateUrl: './iterate-cate.component.html',
  styleUrls: ['./iterate-cate.component.scss']
})
export class IterateCateComponent implements OnInit, OnDestroy {

  _ref: any;
  title: string;
  categories: Array<ProductCategory> = [];
  @ViewChild('childCategory', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  private destroy$: Subject<boolean> = new Subject();
  constructor(private comFactory: ComponentFactoryResolver) { }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  closePanel() {
    this._ref.destroy();
  }//closePanel

  openChildCategory(id: string) {
    this.folderContainer.clear();
    let curCate = this.categories.filter(x => x.id === id)[0];
    let comp = this.comFactory.resolveComponentFactory(IterateCateComponent);
    let dyCom = this.folderContainer.createComponent(comp);
    dyCom.instance._ref = dyCom;
    dyCom.instance.title = curCate.name;
    dyCom.instance.categories =curCate.children;
    // console.log('sle', curCate);
  }//openChildCategory
}
