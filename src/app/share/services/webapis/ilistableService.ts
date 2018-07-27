import { IQuery, Paging } from "./api.service";
import { IQueryFilter } from "../../common/interfaces/iqueryFilter";
import { IEntitybase } from "../../models/ientitybase";
import { BehaviorSubject, Observable } from "rxjs";
export interface IListableService<T> {
    queryData$: BehaviorSubject<Array<IEntitybase>>;
    editData$: BehaviorSubject<IEntitybase>;
    uri: string;
    getById(string): Observable<T>;
    query(query?: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<any>>;
    update(entity: T): Observable<T>;
    batchDelete(idsArr: Array<string>);
    exportData(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>);
    shareDatas(idsArr: Array<string>);
    cancelShareDatas(idsArr: Array<string>);
}
