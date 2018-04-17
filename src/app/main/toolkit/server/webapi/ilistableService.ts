import { IQuery, Paging } from "./api.service";
import { Observable } from "rxjs";
export interface IListableService<T> {
    query: (query: IQuery) => Observable<Paging<T>>;
}