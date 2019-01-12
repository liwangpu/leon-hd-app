import { IQuery, IQueryFilter, IPageData } from "micro-base";
import { Observable } from "rxjs";

export interface IMatAutoSelectApiService {
    getById(id: string | number): Observable<any>;
    query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<IPageData<any>>;
}
