import { IQuery, Paging } from "./api.service";
import { Observable, BehaviorSubject } from "rxjs";
export interface IListableService<T> {
    // onServiceChange: BehaviorSubject<Array<T>>;
    // query: (query: IQuery) => Observable<Paging<T>>;

    // query:Function(query: IQuery)=> Observable<Paging<T>>;
    query<T>(query: IQuery);
}

interface query<T>{
    (query: IQuery): Observable<Paging<T>>
}