import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChildren, QueryList, SimpleChanges } from '@angular/core';
import { AssetCategory } from '../../../../../toolkit/models/assetcategory';
import { CategoryListItemDirective } from './category-list-item.directive';
import { Subject } from 'rxjs/Subject';
import { MathexService } from '../../../../../toolkit/common/services/mathex.service';
import { CommonCategoryTplsMdService } from '../common-category-tpls-md.service';
import { DialogService } from '../../../../../toolkit/common/services/dialog.service';
import { MatDialog } from '@angular/material';
import { SnackbarService } from '../../../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogFactoryService } from '../../../../../toolkit/common/factory/dialog-factory.service';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-common-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {


  @Input() organizationId: string;
  @Input() parentId: string;
  @Input() type: string;
  @Input() title: string;
  @Input() closable: boolean;
  @Input() brief: boolean;
  @Input() categories: Array<AssetCategory>;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Output() onCategorySelected: EventEmitter<string> = new EventEmitter();
  @Output() afterCategoryDeleted: EventEmitter<string> = new EventEmitter();
  @ViewChildren(CategoryListItemDirective) categoryItems: QueryList<CategoryListItemDirective>;
  private destroy$: Subject<boolean> = new Subject();
  private selectedCategory: AssetCategory;
  private minIdx = 0;//最小展示序号
  private maxIdx = 0;//最大展示序号
  constructor(private mathexSrv: MathexService, private mdSrv: CommonCategoryTplsMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackbarSrv: SnackbarService, private dialog: MatDialog) {
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
    if (changes['categories'] && changes['categories'].currentValue && changes['categories'].currentValue.length) {
      let idss = changes['categories'].currentValue.map(x => x.displayIndex);
      this.minIdx = this.mathexSrv.arrayMin(idss);
      this.maxIdx = this.mathexSrv.arrayMax(idss);
    }
  }//ngOnChanges

  trackByCategory(index: number, cate: AssetCategory): number {
    return - cate.displayIndex;
  }

  onItemSelected(id: string) {
    // this.categoryItems.forEach(it => {
    //   if (it.id !== id)
    //     it.reset();
    // });
    // this.onCategorySelected.next(id);
    // this.selectedCategory = this.categories.filter(x => x.id === id)[0];
    // this.categoryMdSrv.afterCategorySelect$.next(this.selectedCategory);
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
    // if (this.selectedCategory.displayIndex > this.minIdx) {
    //   this.categorySrv.moveUpProductCategory(this.selectedCategory).first().subscribe(resCate => {
    //     this.categories = resCate.children;
    //     setTimeout(() => {
    //       this.selectedItem(this.selectedCategory.id);
    //     }, 200);
    //   });
    // }
  }//onMoveUp

  onMoveDown() {
    // if (this.selectedCategory.displayIndex < this.maxIdx) {
    //   this.categorySrv.moveDownProductCategory(this.selectedCategory).first().subscribe(resCate => {
    //     this.categories = resCate.children;
    //     setTimeout(() => {
    //       this.selectedItem(this.selectedCategory.id);
    //     }, 200);

    //   });
    // }
  }//onMoveDown

  onRemove() {
    //   if (!this.selectedCategory)
    //     return;

    //   let getTranAsync = () => {
    //     return new Promise(resole => {
    //       let obs = this.tranSrv.get('message.DeleteConfirm', { value: this.selectedCategory.name }).subscribe(msg => {

    //         resole(msg);
    //         obs.unsubscribe();
    //       });
    //     });//Promise
    //   };//getTranAsync

    //   let confirmAsync = (msg) => {
    //     return new Promise(resole => {
    //       let dialog = this.dialogSrv.confirmDialog(msg);
    //       let obs = dialog.componentInstance.onConfirm.subscribe(() => {

    //         resole();
    //         obs.unsubscribe();
    //       });
    //     });//Promise
    //   };//confirmAsync

    //   let deleteCategoryAsync = () => {
    //     let obs = this.categorySrv.deleteProductCategory(this.selectedCategory.id).subscribe(() => {
    //       this.snackbarSrv.simpleBar('message.DeleteSuccessfully');
    //       this.afterCategoryDeleted.next(this.selectedCategory.id);
    //       // this.categories = this.categories.filter(x => x.id !== this.selectedCategory.id);
    //       this.selectedCategory = undefined;
    //       obs.unsubscribe();
    //     });
  };

  //   getTranAsync().then(confirmAsync).then(deleteCategoryAsync);
  // }//onDeleteCategory

  onEdit(type?: string) {
    if (type === 'edit' && !this.selectedCategory)
      return;

    let defaultCate: AssetCategory;
    if (type === 'new') {
      defaultCate = new AssetCategory();
      defaultCate.type = this.type;
      defaultCate.organizationId = this.organizationId;
      defaultCate.parentId = this.parentId;
      defaultCate.displayIndex = 0;
    }

    let dialog = this.dialogFac.tplsConfirm(CategoryFormComponent, undefined, { width: '400px', height: '350px' });

    //   let dialogObj = this.dialog.open(CategoryFormComponent, {
    //     width: '400px',
    //     height: '450px',
    //     data: { category: type === 'edit' ? this.selectedCategory : defaultCate }
    //   });//

    //   let dialogDestroy = new Subject<boolean>();
    //   dialogObj.afterClosed().first().subscribe(() => {
    //     dialogDestroy.next(true);
    //   });
    //   dialogObj.componentInstance.afterCategorySubmit.takeUntil(dialogDestroy).subscribe(resCate => {
    //     let isExist = this.categories.some(x => x.id === resCate.id);
    //     if (isExist) {
    //       for (let idx = this.categories.length - 1; idx >= 0; idx--) {
    //         if (this.categories[idx].id === resCate.id) {
    //           this.categories[idx] = resCate;
    //           break;
    //         }
    //       }//for
    //     }
    //     else {
    //       this.categories.push(resCate);
    //     }
    //   });//subscribe

  }//onEdit

  close() {
    this.onClose.next();
  }//close


}
