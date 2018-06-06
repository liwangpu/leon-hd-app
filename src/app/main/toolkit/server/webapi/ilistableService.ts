import { IQuery } from "./api.service";
import { IQueryFilter } from "../../common/interfaces/iqueryFilter";
import { Observable } from "rxjs/Observable";
export interface IListableService<T> {
    uri: string;
    query<T>(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>);
    update(entity: T): Observable<T>;
    batchDelete(idsArr: Array<string>);
    exportData(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>);
}
