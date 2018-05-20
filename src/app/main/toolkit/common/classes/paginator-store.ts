import { ElementRef } from '@angular/core';
import { DataSource, } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Paging, IQuery } from "../../server/webapi/api.service";
import { IListableService } from "../../server/webapi/ilistableService";
import { QueryOperateEnums } from '../../enums/enums';
import { IQueryFilter } from '../interfaces/iqueryFilter';

/**
 * 分页列表数据仓库
 * 提供过滤,分页和排序功能
 */
export class PaginatorStore<T> extends DataSource<any> {
    _dataSubject = new BehaviorSubject<Paging<T>>({ data: [], total: 0, page: 1, size: 10 });
    private allowTrigger: boolean = true;//事件订阅触发开关,因为比如过滤事件会触发分页控件返回首页,然后又造成分页控件触发查询,所以需要临时开关关闭相关事件触发机制
    private filterChange = new BehaviorSubject('');
    private advanceFilterChange = new BehaviorSubject([]);
    private queryParams: IQuery;
    private advanceQueryParams: Array<IQueryFilter>;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    get filter() {
        return this.filterChange.value;
    }
    set filter(vl: string) {
        this.resetPaginator();
        this.setFiltering(vl);
        this.filterChange.next(vl);
    }

    set advanceFilter(filters: Array<IQueryFilter>) {
        //重置分页参数
        this.resetPaginator();
        this.advanceQueryParams = filters;
        this.advanceFilterChange.next(filters);
    }//

    get advanceFilter() {
        return this.advanceFilterChange.value;
    }//

    constructor(private option: PaginatorStoreOptions<T>) {
        super();
        this.queryParams = { page: this.option.paginator ? this.option.paginator.pageIndex : 1, pageSize: this.option.paginator ? this.option.paginator.pageSize : 10 };
        this.query();//默认查询
        // let allowTrigger = true;//事件订阅触发开关,因为比如过滤事件会触发分页控件返回首页,然后又造成分页控件触发查询,所以需要临时开关关闭相关事件触发机制
        //订阅分页响应事件
        if (this.option.paginator)
            Observable.from(this.option.paginator.page).takeUntil(this.destroy$).subscribe(paging => {
                if (this.allowTrigger) {
                    this.setPaging(paging['pageIndex'], paging['pageSize']);
                    // this.queryParams.page = paging['pageIndex'];
                    // this.queryParams.pageSize = paging['pageSize'];
                    this.query();
                }
            });
        //订阅排序响应事件
        if (this.option.sort)
            Observable.from(this.option.sort.sortChange).takeUntil(this.destroy$).subscribe(sorting => {
                if (this.allowTrigger) {
                    this.setSorting(sorting['active'], sorting['direction']);
                    this.query();
                }
            });
        //订阅过滤条件过滤响应事件
        Observable.from(this.filterChange).takeUntil(this.destroy$).subscribe(() => {
            this.setFiltering(this.filterChange.value);
            this.query();
        });
        //订阅高级过滤响应事件
        Observable.from(this.advanceFilterChange).takeUntil(this.destroy$).subscribe(() => {
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
                    this.resetPaginator();
                    this.query();
                });
        }//if
    }//constructor

    private resetPaginator() {
        if (this.option.paginator) {
            this.allowTrigger = false;
            this.option.paginator.firstPage();
            this.queryParams.page = 0;
            this.allowTrigger = true;
        }
    }//resetPaginator

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
    private setPaging(index: number, size?: number) {
        index++;
        this.queryParams.page = index;
        if (size)
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
        this.option.service.query(this.queryParams, this.advanceQueryParams).subscribe(res => {
            this._dataSubject.next(res);
            // this.dataSubject.next(res.data ? res.data : []);
        });
    }//query

    /**
     * 基类事件
     */
    connect(): Observable<any[]> {
        return this._dataSubject.map(rdata => {
            if (this.option.paginator)
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

    refresh() {
        this.query();
    }
}//PaginatorStore

export interface PaginatorStoreOptions<T> {
    service: IListableService<T>;
    paginator?: MatPaginator;
    sort?: MatSort;
    searchInputEle?: ElementRef;
    queryPlus?: any;
}