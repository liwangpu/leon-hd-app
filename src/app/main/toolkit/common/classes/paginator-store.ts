import { ElementRef } from '@angular/core';
import { DataSource, } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Paging, IQuery } from "../../server/webapi/api.service";
import { IListableService } from "../../server/webapi/ilistableService";

/**
 * 分页列表数据仓库
 * 提供过滤,分页和排序功能
 */
export class PaginatorStore<T> extends DataSource<any> {
    _dataSubject = new BehaviorSubject<Paging<T>>({ data: [], total: 0, page: 1, size: 10 });
    private filterChange = new BehaviorSubject('');
    private queryParams: IQuery;
    private pagingSubjection: Observable<any>;
    private sortingSubjection: Observable<any>;
    private filteringSubjection: Observable<any>;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    get filter() {
        return this.filterChange.value;
    }
    set filter(vl: string) {
        this.setFiltering(vl);
        this.filterChange.next(vl);
    }

    constructor(private option: PaginatorStoreOptions<T>) {
        super();
        this.queryParams = { page: this.option.paginator ? this.option.paginator.pageIndex : 1, pageSize: this.option.paginator ? this.option.paginator.pageSize : 10 };
        this.query();//默认查询
        //订阅分页响应事件
        if (this.option.paginator)
            Observable.from(this.option.paginator.page).takeUntil(this.destroy$).subscribe(paging => {
                this.setPaging(paging['pageIndex'], paging['pageSize']);
                this.query();
            });
        //订阅排序响应事件
        if (this.option.sort)
            Observable.from(this.option.sort.sortChange).takeUntil(this.destroy$).subscribe(sorting => {
                this.setSorting(sorting['active'], sorting['direction']);
                this.query();

                // console.log(222, 'sort', this.queryParams);
            });
        //订阅过滤条件过滤响应事件
        Observable.from(this.filterChange).takeUntil(this.destroy$).subscribe(sorting => {
            this.setFiltering(this.filterChange.value);
            this.query();
        });
        //订阅搜索框输入响应事件
        if (this.option.searchInputEle) {
            Observable.fromEvent(this.option.searchInputEle.nativeElement, 'keyup')
                .takeUntil(this.destroy$)
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(() => {
                    this.setFiltering(this.option.searchInputEle.nativeElement.value);
                    this.query();
                });
        }//if
    }//constructor

    /**
     * 设置排序信息
     * @param value 
     * @param order 
     */
    private setSorting(value: string, order: string) {
        this.queryParams.orderBy = value;
        this.queryParams.desc = order === 'desc' ? true : false;
    }

    /**
     * 设置分页信息
     * @param index 
     * @param size 
     */
    private setPaging(index: number, size: number) {
        this.queryParams.page = index;
        this.queryParams.pageSize = size;
    }//setPaging

    /**
     * 设置过滤信息
     * @param value 
     */
    private setFiltering(value: string) {
        this.queryParams.search = value;
    }//setFiltering

    /**
     * 查询数据
     */
    private query() {
        this.option.service.query(this.queryParams).subscribe(res => {
            this._dataSubject.next(res);
            // this.dataSubject.next(res.data ? res.data : []);
        });
    }//query

    /**
     * 基类事件
     */
    connect(): Observable<any[]> {
        return this._dataSubject.map(rdata => {
            this.option.paginator.length = rdata.total;
            return rdata.data;
        });
    }

    /**
     * 基类事件
     */
    disconnect(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}//PaginatorStore

export interface PaginatorStoreOptions<T> {
    service: IListableService<T>;
    paginator?: MatPaginator;
    sort?: MatSort;
    searchInputEle?: ElementRef
}