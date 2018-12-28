import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AssetCategory } from '@geek/micro-dmz-hd';
import { V1CategoryEditorInteractService } from '../v1-category-editor-interact.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-v1-category-editor-list',
  templateUrl: './v1-category-editor-list.component.html',
  styleUrls: ['./v1-category-editor-list.component.scss']
})
export class V1CategoryEditorListComponent implements OnInit, OnDestroy {

  @Output() editCategory = new EventEmitter<{ id: string, parentId: string }>();
  @Output() selectCategory = new EventEmitter<string>();
  @Output() moveDown = new EventEmitter<string>();
  @Output() moveUp = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() closeCategory = new EventEmitter<string>();
  @Input() category: AssetCategory;
  selectedId: string;
  categories: Array<AssetCategory> = [];
  destroy$ = new Subject<boolean>();
  constructor(protected interact: V1CategoryEditorInteractService) { }

  ngOnInit() {
    this.interact.categories$.subscribe(cats => {
      if (!cats || cats.length <= 0) return;
      let tmpArr = cats.filter(x => x.parentId == this.category.id);
      this.categories = tmpArr.sort(function (a: AssetCategory, b: AssetCategory) {
        if (a.displayIndex < b.displayIndex)
          return -1;
        if (a.displayIndex > b.displayIndex)
          return 1;
        return 0;
      });
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onMoveUp() {
    if (!this.selectedId) return;
    let selectItem = this.categories.filter(x => x.id == this.selectedId)[0];
    if (selectItem.displayIndex <= 0) return;
    this.moveUp.next(this.selectedId);
  }//onMoveUp

  onMoveDown() {
    if (!this.selectedId) return;
    let selectItem = this.categories.filter(x => x.id == this.selectedId)[0];
    if (selectItem.displayIndex >= this.categories.length - 1) return;
    this.moveDown.next(this.selectedId);
  }//onMoveDown

  onAdd() {
    this.editCategory.next({ id: undefined, parentId: this.category.id });
  }//onAdd

  onEdit() {
    if (!this.selectedId) return;
    this.editCategory.next({ id: this.selectedId, parentId: this.category.id });
  }//onEdit

  onSelect(id: string) {
    this.selectedId = id;
    this.selectCategory.next(id);
  }//onSelect

  onRemove() {
    if (!this.selectedId) return;
    this.remove.next(this.selectedId);
  }//onRemove

  onClose() {
    this.closeCategory.next(this.category.id);
  }//onClose

}
