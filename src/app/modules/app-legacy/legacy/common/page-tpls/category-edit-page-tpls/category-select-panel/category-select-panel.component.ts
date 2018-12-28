import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { CategoryNavExtend } from '../category-edit-refers';
import { Subject, of } from 'rxjs';
import { TreeModel, NodeEvent } from 'ng2-tree';
import { CommonCategoryTplsMdService } from '../common-category-tpls-md.service';
import { TranslateService } from '@ngx-translate/core';
import { concatMap, tap } from 'rxjs/operators';
import { AssetCategory } from '../../../../models/assetcategory';

@Component({
  selector: 'app-category-select-panel',
  templateUrl: './category-select-panel.component.html',
  styleUrls: ['./category-select-panel.component.scss'],
  providers: [{ provide: CategoryNavExtend, useExisting: forwardRef(() => CategorySelectPanelComponent) }]
})
export class CategorySelectPanelComponent implements OnInit, CategoryNavExtend {

  settings = {
    static: true,
    rightMenu: false,
    leftMenu: false
  };
  categoryName: string;
  afterCategorySelected$ = new Subject<string>();
  categoryModel: TreeModel;
  @Input() categoryType = 'glossary.Category';
  @Input() addUnCategoryNode = true;
  @Input() launch: CommonCategoryTplsMdService;
  @Output() onCategorySelect = new EventEmitter<string>();
  @Output() onCategorySelectWithDetail = new EventEmitter<AssetCategory>();
  constructor(private tranSrv: TranslateService) { }

  ngOnInit() {
    if (!this.launch)
      return;

    let rootNodeName = '';
    let unCategoryName = '';
    let source$ = this.launch.apiSrv.getAllAssetCategory();
    let transRoot = concatMap(category => {
      return this.tranSrv.get(this.categoryType).pipe(tap(name => rootNodeName = name)).pipe(concatMap(_ => of(category)));
    });
    let transUnCategory = concatMap(category => {
      return this.tranSrv.get('glossary.UnCategory').pipe(tap(name => unCategoryName = name)).pipe(concatMap(_ => of(category)));
    });
    source$.pipe(transRoot, transUnCategory).subscribe(resCat => {
      (resCat as TreeModel).value = rootNodeName;
      if (this.addUnCategoryNode) {
        //添加未分类节点
        let unCategory = { id: '', value: unCategoryName, children: undefined };
        (resCat as TreeModel).children.unshift(unCategory);
      }
      this.clearChildren(resCat as TreeModel);
      this.categoryModel = resCat as TreeModel;
      this.categoryModel.settings = this.settings;
    });

  }//ngOnInit

  clearChildren(obj: TreeModel) {

    if (!obj.children) return;

    if (obj.children.length === 0) {
      obj.children = undefined;
    }
    else {
      for (let child of obj.children) {
        this.clearChildren(child);
      }
    }
  }//clearChildren

  /**
 * 分类节点选中
 * @param e 
 */
  selectCategory(e: NodeEvent): void {
    let id = e.node.id.toString();
    this.onCategorySelect.next(id);
    var cate = new AssetCategory();
    cate.id = id;
    cate.name = e.node.value;
    this.afterCategorySelected$.next(id);
    this.onCategorySelectWithDetail.next(cate);
  }//selectCategory
}
