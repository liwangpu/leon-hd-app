import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChildren, QueryList, SimpleChanges } from '@angular/core';
import { AssetCategory } from '../../../../../toolkit/models/assetcategory';
import { CategoryListItemDirective } from './category-list-item.directive';
import { Subject } from 'rxjs/Subject';
import { CommonCategoryTplsMdService } from '../common-category-tpls-md.service';
import { DialogFactoryService } from '../../../../../toolkit/common/factory/dialog-factory.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { AsyncHandleService } from '../../../../services/async-handle.service';
import { SimpleMessageContentComponent } from '../../../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';

@Component({
  selector: 'app-common-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input() parentId: string;
  @Input() title: string;
  @Input() closable: boolean;
  @Input() brief: boolean;
  @Input() categories: Array<AssetCategory>;
  @Output() onClose = new EventEmitter();
  @Output() onCategorySelected = new EventEmitter();
  @Output() afterCategoryDeleted = new EventEmitter<{ parentId: string, children: Array<AssetCategory> }>();
  @Output() afterCategoryChange = new EventEmitter<{ parentId: string, children: Array<AssetCategory> }>();
  @ViewChildren(CategoryListItemDirective) categoryItems: QueryList<CategoryListItemDirective>;
  private destroy$: Subject<boolean> = new Subject();
  private selectedCategory: AssetCategory;
  constructor(private mdSrv: CommonCategoryTplsMdService, protected dialogFac: DialogFactoryService, private asyncHandleSrv: AsyncHandleService) {
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
    let categoryChange = changes['categories'];
    if (categoryChange && categoryChange.currentValue && categoryChange.currentValue.length) {
      this.categories = categoryChange.currentValue;
    }
  }//ngOnChanges

  trackByCategory(index: number, cate: AssetCategory): number {
    return - cate.displayIndex;
  }

  onItemSelected(id: string) {
    this.categoryItems.forEach(it => {
      if (it.id !== id)
        it.reset();
    });
    this.onCategorySelected.next(id);
    this.selectedCategory = this.categories.filter(x => x.id === id)[0];
    this.mdSrv.afterCategorySelect$.next(this.selectedCategory);
  }//onItemSelected

  selectedItem(id: string) {
    this.categoryItems.forEach(it => {
      if (it.id === id)
        it.select();
      else
        it.reset();
    });
  }

  onClear() {
    this.categoryItems.forEach(it => {
      it.reset();
      this.selectedCategory = null;
    });
  }//onClear


  onMoveUp() {
    if (!this.selectedCategory || this.selectedCategory.displayIndex <= 0)
      return;

    this.mdSrv.apiSrv.moveUpAssetCategory(this.selectedCategory).subscribe(resCate => {
      this.categories = resCate.children;
      this.selectedCategory = this.categories.filter(x => x.id == this.selectedCategory.id)[0];
      this.afterCategoryChange.next({ parentId: this.parentId, children: this.categories });
      setTimeout(() => {
        this.selectedItem(this.selectedCategory.id);
      }, 200);
    });
  }//onMoveUp

  onMoveDown() {
    if (!this.selectedCategory || this.selectedCategory.displayIndex >= this.categories.length - 1)
      return;
    this.mdSrv.apiSrv.moveDownAssetCategory(this.selectedCategory).subscribe(resCate => {
      this.categories = resCate.children;
      this.selectedCategory = this.categories.filter(x => x.id == this.selectedCategory.id)[0];
      this.afterCategoryChange.next({ parentId: this.parentId, children: this.categories });
      setTimeout(() => {
        this.selectedItem(this.selectedCategory.id);
      }, 200);
    });
  }//onMoveDown

  onRemove() {
    if (!this.selectedCategory)
      return;
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: this.selectedCategory.name } });
    dialog.afterOpen().subscribe(_ => {
      let ins = dialog.componentInstance.componentIns as SimpleMessageContentComponent;
      ins.afterConfirm.subscribe(_ => {
        let source$ = this.mdSrv.apiSrv.deleteAssetCategory(this.selectedCategory.id);
        this.asyncHandleSrv.asyncRequest(source$).subscribe(_ => {
          ins.doneAsync.next();
          ins.closeDialog.next();
          this.categories = this.categories.filter(x => x.id !== this.selectedCategory.id);
          this.afterCategoryChange.next({ parentId: this.selectedCategory.parentId, children: this.categories });
          this.afterCategoryDeleted.next({ parentId: this.selectedCategory.parentId, children: this.categories })
          this.selectedCategory = undefined;
          this.onClear();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//afterOpen
  }//onRemove

  onEdit(type?: string) {
    if (type === 'edit' && !this.selectedCategory)
      return;

    let defaultCate: AssetCategory;
    if (type === 'new') {
      defaultCate = new AssetCategory();
      defaultCate.parentId = this.parentId;
      defaultCate.displayIndex = 0;
    }

    let dialog = this.dialogFac.tplsConfirm(CategoryFormComponent, 'dialog.EditCategory', { width: '400px', height: '300px', data: { category: type === 'edit' ? this.selectedCategory : defaultCate } });

    dialog.afterOpen().subscribe(_ => {
      let ins = dialog.componentInstance.componentIns as CategoryFormComponent;
      ins.afterConfirm.subscribe(_ => {
        let source$ = this.mdSrv.apiSrv.updateAssetCategory(ins.categoryForm.value);
        this.asyncHandleSrv.asyncRequest(source$).subscribe(rdata => {
          let isExist = this.categories.some(x => x.id === rdata.id);
          if (isExist) {
            for (let idx = this.categories.length - 1; idx >= 0; idx--) {
              if (this.categories[idx].id === rdata.id) {
                this.categories[idx] = rdata;
                break;
              }
            }//for
          }
          else {
            this.categories.push(rdata);
          }
          this.afterCategoryChange.next({ parentId: this.parentId, children: this.categories });
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm

    });//afterOpen

  }//onEdit

  trackCategory(item?: AssetCategory): string {
    return item ? item.id : '';
  }//trackCategory

  close() {
    this.onClose.next();
  }//close


}
