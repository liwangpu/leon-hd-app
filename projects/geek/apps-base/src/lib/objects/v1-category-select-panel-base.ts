import { OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TreeModel } from "ng2-tree";
import { IV1CategorySelectApiServer } from "../interfaces/i-v1-category-select-api-server";
import { TranslateService } from "@ngx-translate/core";
import { forkJoin } from "rxjs";


export class V1CategorySelectPanelBase implements OnInit {

    private _allCategories: Array<any> = [];
    settings = {
        static: true,
        rightMenu: false,
        leftMenu: false
    };
    categoryModel: TreeModel = { value: '默认值' };
    @Input() unCategoryName = 'glossary.UnCategory';
    @Input() categoryType = 'glossary.AllCategory';
    @Input() addUnCategoryNode = true;
    @Output() nodeSelected = new EventEmitter<string>();//获取的是id
    @Output() nodeItemSelected = new EventEmitter<any>();//获取的是选择项
    constructor(protected categorySrv: IV1CategorySelectApiServer, protected tranSrv: TranslateService) {

    }//constructor

    ngOnInit(): void {
        this.categorySrv.getAll().subscribe(resCat => {
            let transRoot$ = this.tranSrv.get(this.categoryType);
            let transUnCategory$ = this.tranSrv.get(this.unCategoryName);
            forkJoin(transRoot$, transUnCategory$).subscribe(vl => {
                let rootNodeName = vl[0];
                let unCategoryName = vl[1];
                (resCat as TreeModel).value = rootNodeName;
                if (this.addUnCategoryNode) {
                    //添加未分类节点
                    let unCategory = { id: '', value: unCategoryName, children: undefined };
                    (resCat as TreeModel).children.unshift(unCategory);
                }
                this.clearChildren(resCat);
                resCat.settings = this.settings;
                this.categoryModel = resCat;
            });
        });//subscribe
    }//ngOnInit

    onNodeSelected(id: string) {
        this.nodeSelected.next(id);
        let refItem = this._allCategories.filter(x => x.id == id)[0];
        if (refItem) 
            this.nodeItemSelected.next(refItem);
    }//onNodeSelected

    clearChildren(obj: TreeModel) {
        if (!obj.children) return;

        if (obj.children.length === 0) {
            obj.children = undefined;
        }
        else {
            this._allCategories = [...this._allCategories, ...obj.children];
            for (let child of obj.children) {
                this.clearChildren(child);
            }
        }
    }//clearChildren
}
