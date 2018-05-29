import { IQuery } from "./api.service";
import { IQueryFilter } from "../../common/interfaces/iqueryFilter";
export interface IListableService<T> {
    // onServiceChange: BehaviorSubject<Array<T>>;
    // query: (query: IQuery) => Observable<Paging<T>>;

    // query:Function(query: IQuery)=> Observable<Paging<T>>;
    query<T>(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>);
    batchDelete(idsArr: Array<string>);
}
