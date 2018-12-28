import { Observable } from "rxjs";
import { IQueryFilter, IQuery, IPageData } from "@geek/micro-base";


export interface IV1ListViewPageApiServer {
    batchDelete(idsArr: Array<string>): Observable<any>;
    query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<IPageData<any>>;
}
