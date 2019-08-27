import { OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subject, combineLatest } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil, tap } from "rxjs/operators";
import { DatePipe } from "@angular/common";
import { Location } from '@angular/common';
import { IQueryFilter, IQuery, QueryOperateEnum } from "micro-base";
import { Navigation } from "micro-app-basic";
import { ICommonTableColumndef, IListViewAdvanceMenu, ITableListRowMenu, ClassicListViewComponent, SimpleConfirmMessageDialogComponent } from "scaffold-page-plate";
import { IV1ListViewPageApiServer } from "../interfaces/i-v1-list-view-page-api-server";
import { AppProgressService, AppSearchService } from "scaffold-app-core";
import { AsyncHandleService, DialogFactoryService } from "scaffold-app-minor";
import { IPageData } from 'scaffold-page-plate';

export class V1ListViewPageBase implements OnInit, OnDestroy {

    //提供常用的列
    protected _nameColumnDef: ICommonTableColumndef = {
        id: 'name', name: 'glossary.Name', width: 180, cell: (data: any) => {
            return data['name'];
        }
    };
    protected _descriptionColumnDef: ICommonTableColumndef = {
        id: 'description', name: 'glossary.Description', width: 200, cell: (data: any) => {
            return data['description'];
        }
    };
    protected _createdTime: ICommonTableColumndef = {
        id: 'createdTime', name: 'glossary.CreatedTime', width: 110, cell: (data: any) => {
            return this.datePipeTr.transform(data['createdTime'], 'yyyy-MM-dd');
        }
    };

    //提供常用高级菜单
    protected _deleteAdvanceMenu: IListViewAdvanceMenu = {
        name: 'button.Delete',
        icon: 'delete',
        needSelectedItem: true,
        permissionPoint: 'delete',
        onClick: (selectedIds: Array<string>) => {
            let ins = this.dialogSrv.open(SimpleConfirmMessageDialogComponent, {
                width: '450px',
                height: '350px',
                data: { message: `您确定删除这 ${selectedIds.length} 条记录吗？删除后数据将无法恢复,请确认是否继续进行！` }
            });

            ins.componentInstance.afterConfirm$.subscribe(() => {
                ins.componentInstance.afterReceiveData({ message: "234234", param: "" });
                let manualHandleError = (err: any) => {
                    let msg = '';
                    if (err.error && err.error.errors && err.error.errors.length > 0)
                        for (let it of err.error.errors) {
                            msg += it.message;
                        }
                    return msg;
                };
                let source$ = this.apiSrv.batchDelete(selectedIds);
                this.asyncHandle.asyncRequest(source$, false, manualHandleError).subscribe(() => {
                    this._queryData();
                    this.listViewCt.clearSelected();
                });

                ins.componentInstance.closeDialog();
            }, err => {
                ins.componentInstance.closeDialog();
            });
        }
    };

    protected _innerFilters: Array<IQueryFilter> = [];//内置的查询参数,无论什么时候都附带的
    protected _keyword: string;
    protected _currentPageModel: string;
    protected _advanceQueryFilters: Array<IQueryFilter> = [];
    title: string;
    icon: string;
    resource: string;
    pageModels: Array<string> = [];//页面列表展示的方式
    navUrls: Array<string> = [];
    pageSizeOptions = [25, 50, 100];
    pageData: IPageData = { data: [], page: 1, size: 25, total: 0 };
    rowMenus: Array<ITableListRowMenu> = [];
    advanceMenus: Array<IListViewAdvanceMenu> = [
        this._deleteAdvanceMenu
    ];//给个默认高级按钮
    permissionPoints: Array<string> = [];
    displayedColumns: Array<string> = [];
    columnDefs: Array<ICommonTableColumndef> = [
        this._nameColumnDef
        , this._descriptionColumnDef
        , this._createdTime
    ];//给几个默认常用列
    destroy$ = new Subject<boolean>();
    @ViewChild('listViewCt') listViewCt: ClassicListViewComponent;
    constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: IV1ListViewPageApiServer, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe, protected dialogSrv: DialogFactoryService) {

    }//constructor

    set keyword(vl: string) {
        this._keyword = vl;
        this._queryData();
    }

    set advanceQueryFilters(filters: Array<IQueryFilter>) {
        if (!filters)
            filters = [];
        this._advanceQueryFilters = filters;
        this.pageData.page = 1;
        this.pageData.total = 0;
        this._queryData();
    }

    protected _queryData() {
        this.progressSrv.showProgress = true;
        let query: IQuery = {
            search: this._keyword,
            page: this.pageData.page,
            pageSize: this.pageData.size,
            orderBy: this.pageData.sort,
            desc: this.pageData.desc
        };
        let tmpAdvanceFilter = [...this._advanceQueryFilters, ...this._innerFilters];
        this.apiSrv.query(query, tmpAdvanceFilter).subscribe(res => {
            let size = this.pageData.size;
            let sort = this.pageData.sort;
            let desc = this.pageData.desc;
            this.pageData = res;
            this.pageData.size = size;
            this.pageData.sort = sort;
            this.pageData.desc = desc;
            this.progressSrv.showProgress = false;
            this._refreshUrlRecovery();
        });
    }//queryData

    protected _stringifyEncodeUrlParam(rec: ListPageRecovery) {
        var paramsPart = "";
        for (var key in rec) {
            if (paramsPart != "") {
                paramsPart += "&";
            }
            paramsPart += key + "=" + encodeURIComponent(rec[key]);
        }
        return paramsPart;
    }

    protected _refreshUrlRecovery() {
        if (this.navUrls.length > 0) {
            //拼接查询参数,以便能够快速还原页面
            let rec = this._prepareReturn();
            let prmStr = this._stringifyEncodeUrlParam(rec);
            this.location.go(this.navUrls[0], prmStr);
        }
    }

    protected _prepareReturn(): ListPageRecovery {
        let rec = new ListPageRecovery();
        rec.kw = this._keyword ? this._keyword : '';
        rec.dx = this.pageData.page;
        rec.sz = this.pageData.size;
        rec.fd = this.pageData.sort ? this.pageData.sort : '';
        rec.sc = this.pageData.desc ? true : false;
        rec.vm = this._currentPageModel;
        //url添加高级查询参数
        let tmpAdvanceFilter = [...this._advanceQueryFilters, ...this._innerFilters];
        if (tmpAdvanceFilter && tmpAdvanceFilter.length > 0) {
            for (let it of tmpAdvanceFilter) {
                if (it.operate == QueryOperateEnum.equal)
                    rec[it.field] = it.value;
            }
        }
        return rec;
    }//_prepareReturn

    ngOnInit(): void {
        //默认关闭搜索栏
        this.searchSrv.closeSearch();
        this.searchSrv.search$.pipe(takeUntil(this.destroy$)).subscribe(keyword => {
            this.keyword = keyword;
        });//subscribe

        let dataParam$ = this.actr.data.pipe(takeUntil(this.destroy$)).pipe(tap(data => {
            let navs: Array<Navigation> = data.navigations;
            if (this.resource && navs && navs.length > 0) {
                let refNav = navs.filter(x => x.resource ? (x.resource.toLocaleLowerCase() == this.resource.toLocaleLowerCase()) : false)[0];
                if (!refNav) {
                    this.router.navigate(['/']);
                    return;
                }
                this.title = refNav.title;
                this.icon = refNav.icon;
                this.navUrls = refNav.url ? refNav.url.split(",") : [];
                this.pageModels = refNav.pagedModel ? refNav.pagedModel.split(",") : [];
                this._currentPageModel = this.pageModels[0];
                this.permissionPoints = refNav.permission ? refNav.permission.split(",") : [];
                this.displayedColumns = refNav.field ? refNav.field.split(",") : [];

                if (refNav.queryParams) {
                    let qArr = refNav.queryParams.split(',');
                    for (let it of qArr) {
                        let spArr = it.split('=');
                        let ft: IQueryFilter = {
                            field: spArr[0],
                            value: spArr[1],
                            operate: QueryOperateEnum.equal
                        };
                        this._innerFilters.push(ft);
                    }
                }

            }
        }));//$

        let queryParam$ = this.actr.queryParams.pipe(takeUntil(this.destroy$)).pipe(tap((pr: ListPageRecovery) => {
            this._keyword = pr.kw;
            this.pageData.page = pr.dx;
            this.pageData.size = pr.sz ? pr.sz : this.pageData.size;
            this.pageData.sort = pr.fd ? pr.fd : '';
            this.pageData.desc = pr.sc && pr.sc.toString() == "true" ? true : false;
            if (pr.vm) {
                this._currentPageModel = pr.vm;
                let pageModelsArr = this.pageModels;
                let tmpModelArr = pageModelsArr.filter(x => x !== this._currentPageModel);
                tmpModelArr.unshift(this._currentPageModel);
                this.pageModels = tmpModelArr;
            }

            //处理url上记录的高级筛选参数
            let allKeys = Object.keys(pr);
            let defaultQueryKeys = ListPageRecovery.getKeys();
            let tmpAdvanceFilters: Array<IQueryFilter> = [];
            for (let it of allKeys) {
                let isDefaultKey = defaultQueryKeys.some(x => x == it);
                if (!isDefaultKey) {
                    let filter: IQueryFilter = {
                        field: it,
                        operate: QueryOperateEnum.equal,
                        value: pr[it]
                    };
                    tmpAdvanceFilters.push(filter);
                }
            }
            this.advanceQueryFilters = tmpAdvanceFilters;
            //默认第一次查询数据
            this._queryData();
        }));

        combineLatest(dataParam$, queryParam$).subscribe();
    }//ngOnInit

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }//ngOnDestroy

    onPageChange(pageIndex: number): void {
        this.pageData.page = pageIndex;
        this._queryData();
    }//onPageChange

    onPageOptionChange(size: number) {
        this.pageData.size = size;
        this.pageData.page = 1;
        this._queryData();
    }//onPageOptionChange

    onRefresh() {
        this._queryData();
    }//onRefresh

    onRowClick(ms: { data: any, id: string }) {
        if (this.navUrls.length > 1) {
            //拼接查询参数,以便能够快速还原页面
            let rec = this._prepareReturn();
            this.router.navigate([`${this.navUrls[1]}/${ms.id}`], { queryParams: rec })
        }
    }//onRowClick

    onSortData(sort: { field: string, direction: string }) {
        this.pageData.sort = sort.field;
        if (sort.direction != '') {
            this.pageData.desc = sort.direction == 'desc' ? true : false;
        }
        this.pageData.page = 1;
        this._queryData();
    }//sortData

    onPageModelChange(mod: string) {
        this._currentPageModel = mod;
        this._refreshUrlRecovery();
    }//onPageModelChange

    onCreateData() {
        if (this.navUrls && this.navUrls.length > 1)
            this.router.navigate([this.navUrls[1]]);
    }//onCreateData

}

export class ListPageRecovery {
    kw: string;//keyword
    dx: number;//pageIndex
    sz: number;//pageSize
    fd: string;//sort.field 
    sc: boolean;//sort.desc
    vm: string;//view model
    /**
     * 因为获取Typescript class属性有点麻烦,直接用数组返回
     * 切记这个类上添加新的属性,要加入如下的数组中
     */
    static getKeys() {
        return ['kw', 'dx', 'sz', 'fd', 'sc', 'vm'];
    }
}