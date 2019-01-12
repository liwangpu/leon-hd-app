import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetCategory } from 'micro-dmz-hd';
import { V1CategoryEditorInteractService } from './v1-category-editor-interact.service';
import { IV1CategoryApiServer } from 'apps-base';
import { DialogFactoryService, AsyncHandleService } from 'scaffold-app-minor';
import { V1CategoryEditorFormComponent } from './v1-category-editor-form/v1-category-editor-form.component';

@Component({
  selector: 'app-v1-category-editor',
  templateUrl: './v1-category-editor.component.html',
  styleUrls: ['./v1-category-editor.component.scss'],
  providers: [
    V1CategoryEditorInteractService
  ]
})
export class V1CategoryEditorComponent implements OnInit {

  rootCategory: AssetCategory;
  @Input() title: string;
  @Input() icon: string;
  @Input() categoryAPISrv: IV1CategoryApiServer;
  categoryPanels: Array<AssetCategory> = [];
  constructor(protected interact: V1CategoryEditorInteractService, protected dialogSrv: DialogFactoryService, protected asyncHandleSrv: AsyncHandleService) {

  }//constructor

  ngOnInit() {

    //获取扁平分类信息
    if (this.categoryAPISrv) {
      this.categoryAPISrv.getFlat().subscribe(cats => {
        if (!cats || cats.length <= 0) return;
        this.rootCategory = cats.filter(x => x.isRoot == true)[0]
        this.interact.categories$.next(cats);
      });
    }//if

  }//ngOnInit

  refreshCategories(arr: Array<AssetCategory>) {
    let categories = this.interact.categories$.getValue();
    for (let idx = arr.length - 1; idx >= 0; idx--) {
      for (let cdx = categories.length - 1; cdx >= 0; cdx--) {
        if (arr[idx].id == categories[cdx].id) {
          categories[cdx] = arr[idx];
          break;
        }
      }//for
    }//for
    this.interact.categories$.next(categories);
  }//refreshCategories

  onEditCategory(obj: { id: string, parentId: string }) {
    let data: AssetCategory;
    if (obj.id) {
      data = this.interact.categories$.getValue().filter(x => x.id == obj.id)[0];
    }
    else {
      data = new AssetCategory();
      data.parentId = obj.parentId;
      data.type = this.rootCategory.type;
    }
    let dialogRef = this.dialogSrv.open(V1CategoryEditorFormComponent, {
      width: '400px',
      height: '300px',
      disableClose: true,
      data: { category: data }
    });

    dialogRef.componentInstance.afterSubmit.subscribe(form => {

      let source$ = this.categoryAPISrv.updateType(form);
      this.asyncHandleSrv.asyncRequest(source$).subscribe(res => {
        let categories = this.interact.categories$.getValue();
        if (data.id) {
          for (let idx = categories.length - 1; idx >= 0; idx--) {
            let item = categories[idx];
            if (item.id == res.id)
              categories[idx] = res;
          }
        }
        else {
          categories.push(res);
        }
        this.interact.categories$.next(categories);
        dialogRef.close();
      }, err => {
        dialogRef.close();
      });
    });//afterSubmit
  }//onAddCategory

  onSelectCategory(id: string) {
    let categories = this.interact.categories$.getValue();
    let selectItem = categories.filter(x => x.id == id)[0];
    let existSameLevel = this.categoryPanels.some(x => x.parentId == selectItem.parentId);
    if (existSameLevel) {
      let nextCategoryId: string;
      for (let idx = 0, len = this.categoryPanels.length; idx < len; idx++) {
        let item = this.categoryPanels[idx];
        if (item.parentId == selectItem.parentId) {
          this.categoryPanels[idx] = selectItem;
          //找到下一个面板的分类id
          if (this.categoryPanels[idx + 1]) {
            nextCategoryId = this.categoryPanels[idx + 1].id;
          }
          break;
        }
      }//for
      //关闭下一层级后的分类
      if (nextCategoryId)
        this.onCloseCategory(nextCategoryId);
    }
    else {
      this.categoryPanels.push(selectItem);
    }
  }//onSelectCategory

  onCloseCategory(id: string) {
    let categories = this.interact.categories$.getValue();
    let selectItem = categories.filter(x => x.id == id)[0];
    let seed = 0;
    for (let idx = 0, len = this.categoryPanels.length; idx < len; idx++) {
      let item = this.categoryPanels[idx];
      if (item.parentId == selectItem.parentId) {
        seed = idx;
        break;
      }
    }//for

    for (let idx = 0, len = this.categoryPanels.length; idx < len; idx++) {
      if (idx >= seed)
        this.categoryPanels[idx] = undefined;
    }//for

    this.categoryPanels = this.categoryPanels.filter(x => x);
  }//onCloseCategory

  onMoveDown(id: string) {
    let source$ = this.categoryAPISrv.arrowDown(id);
    this.asyncHandleSrv.asyncRequest(source$).subscribe(parent => {
      this.refreshCategories(parent.children);
    });//subscribe
  }//onMoveDown

  onMoveUp(id: string) {
    let source$ = this.categoryAPISrv.arrowUp(id);
    this.asyncHandleSrv.asyncRequest(source$).subscribe(parent => {
      this.refreshCategories(parent.children);
    });//subscribe
  }//onMoveUp

  onRemove(id: string) {
    let source$ = this.categoryAPISrv.deleteType(id);
    let cats = this.interact.categories$.getValue();
    let selectItem = cats.filter(x => x.id == id)[0];
    this.asyncHandleSrv.asyncRequest(source$).subscribe(() => {
      this.onCloseCategory(id);
      this.interact.categories$.next(cats.filter(x => x.id != id));
    });//subscribe
  }//onRemove

}
