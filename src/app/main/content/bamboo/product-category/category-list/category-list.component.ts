import { Component, OnInit, Input, Output, AfterViewInit, ViewChildren, QueryList, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ProductCategory } from "../../../../toolkit/models/productcategory";
import { CategoryItemDirective } from "./category-item.directive";
import { Subject } from 'rxjs';
@Component({
  selector: 'app-product-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {


  @Input() closable: boolean;
  @Input() categories: Array<ProductCategory>;
  @Output() onCategorySelected: EventEmitter<string> = new EventEmitter();
  @ViewChildren(CategoryItemDirective) categoryItems: QueryList<CategoryItemDirective>;
  private destroy$: Subject<boolean> = new Subject();
  constructor() {
    //TODO:删除
    this.closable = true;
  }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  ngAfterViewInit(): void {

  }//ngAfterViewInit

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['categories']) {
    //   // this.categories = changes['categories'];
    //   console.log(111,'form ca',changes['categories'])
    // }
    // else{
    //   console.log(111,'form ca null')
    // }
  }//ngOnChanges

  trackByCategory(index: number, cate: ProductCategory): number {
    return - cate.displayIndex;
  }

  onItemSelected(id: string) {
    this.categoryItems.forEach(it => {
      if (it.id !== id)
        it.reset();
    });
    this.onCategorySelected.next(id);
  }//onItemSelected

  onDeleteCategory(id: string, name: string) {

  }//onDeleteCategory
}
