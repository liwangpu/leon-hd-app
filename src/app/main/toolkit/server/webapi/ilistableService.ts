import { IQuery, Paging } from "./api.service";
import { IQueryFilter } from "../../common/interfaces/iqueryFilter";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IEntitybase } from "../../models/ientitybase";
export interface IListableService<T> {
    queryData$: BehaviorSubject<Array<IEntitybase>>;
    editData$: BehaviorSubject<IEntitybase>;
    uri: string;
    query<T>(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<any>>;
    update(entity: T): Observable<T>;
    batchDelete(idsArr: Array<string>);
    exportData(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>);
}
