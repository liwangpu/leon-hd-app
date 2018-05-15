import { IQuery } from "./api.service";
export interface IListableService<T> {
    // onServiceChange: BehaviorSubject<Array<T>>;
    // query: (query: IQuery) => Observable<Paging<T>>;

    // query:Function(query: IQuery)=> Observable<Paging<T>>;
    query<T>(query: IQuery);
}
