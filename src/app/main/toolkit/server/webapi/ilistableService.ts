import { IQuery, Paging } from "./api.service";
import { Observable, BehaviorSubject } from "rxjs";
export interface IListableService<T> {
    onServiceChange: BehaviorSubject<Array<T>>;
    query: (query: IQuery) => Observable<Paging<T>>;
}