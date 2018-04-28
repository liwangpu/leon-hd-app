import { Component, OnInit, Input, Output, AfterViewInit, ViewChildren, QueryList, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ProductCategory } from "../../../../toolkit/models/productcategory";
import { CategoryItemDirective } from "./category-item.directive";
import { Subject } from 'rxjs';
import { MathexService } from '../../../../toolkit/common/services/mathex.service';
import { ProductCategoryService } from '../../../../toolkit/server/webapi/productcategory.service';
import { DialogService } from '../../../../toolkit/common/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { MatDialog } from '@angular/material';
import { CategoryFormComponent } from "../category-form/category-form.component";
@Component({
  selector: 'app-product-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input() title: string;
  @Input() closable: boolean;
  @Input() categories: Array<ProductCategory>;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Output() onCategorySelected: EventEmitter<string> = new EventEmitter();
  @ViewChildren(CategoryItemDirective) categoryItems: QueryList<CategoryItemDirective>;
  private destroy$: Subject<boolean> = new Subject();
  private selectedCategory: ProductCategory;
  private minIdx = 0;//最小展示序号
  private maxIdx = 0;//最大展示序号
  constructor(private mathexSrv: MathexService, private categorySrv: ProductCategoryService, private dialogSrv: DialogService, private tranSrv: TranslateService, private snackbarSrv: SnackbarService, private dialog: MatDialog) {
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

  trackByCategory(index: number, cate: ProductCategory): number {
    return - cate.displayIndex;
  }

  onItemSelected(id: string) {
    this.categoryItems.forEach(it => {
      if (it.id !== id)
        it.reset();
    });
    this.onCategorySelected.next(id);
    this.selectedCategory = this.categories.filter(x => x.id === id)[0];
  }//onItemSelected

  selectedItem(id: string) {

    this.categoryItems.forEach(it => {
      if (it.id === id)
        it.select();
      else
        it.reset();
    });
  }


  onMoveUp() {
    if (this.selectedCategory.displayIndex > this.minIdx) {
      this.categorySrv.moveUpProductCategory(this.selectedCategory).takeUntil(this.destroy$).subscribe(resCate => {
        this.categories = resCate.children;
        setTimeout(() => {
          this.selectedItem(this.selectedCategory.id);
        }, 200);
      });
    }
  }//onMoveUp

  onMoveDown() {
    if (this.selectedCategory.displayIndex < this.maxIdx) {
      this.categorySrv.moveDownProductCategory(this.selectedCategory).takeUntil(this.destroy$).subscribe(resCate => {
        this.categories = resCate.children;

        setTimeout(() => {
          this.selectedItem(this.selectedCategory.id);
        }, 200);

      });
    }
  }//onMoveDown

  onRemove() {
    if (!this.selectedCategory)
      return;

    let getTranAsync = () => {
      return new Promise(resole => {
        let obs = this.tranSrv.get('message.DeleteConfirm', { value: this.selectedCategory.name }).subscribe(msg => {

          resole(msg);
          obs.unsubscribe();
        });
      });//Promise
    };//getTranAsync

    let confirmAsync = (msg) => {
      return new Promise(resole => {
        let dialog = this.dialogSrv.confirmDialog(msg);
        let obs = dialog.componentInstance.onConfirm.subscribe(() => {

          resole();
          obs.unsubscribe();
        });
      });//Promise
    };//confirmAsync

    let deleteCategoryAsync = () => {
      let obs = this.categorySrv.deleteProductCategory(this.selectedCategory.id).subscribe(() => {
        this.snackbarSrv.simpleBar('message.DeleteSuccessfully');
        this.categories = this.categories.filter(x => x.id !== this.selectedCategory.id);
        this.selectedCategory = undefined;
        obs.unsubscribe();
      });
    };

    getTranAsync().then(confirmAsync).then(deleteCategoryAsync);
  }//onDeleteCategory

  onEdit() {
    if (!this.selectedCategory)
      return;
    let dialogObj = this.dialog.open(CategoryFormComponent, {
      width: '400px',
      height: '600px',
      // data: { productSpecId: this.detailMdSrv.productSpec.id }
    });

    let obs = dialogObj.afterClosed().subscribe(() => {

      obs.unsubscribe();
      // if (ndialog.componentInstance.isCharletChange)
      //   this.detailMdSrv.afterProductCharletChange$.next(true);
    });

  }//onEdit

  close() {
    this.onClose.next();
  }//close


}
