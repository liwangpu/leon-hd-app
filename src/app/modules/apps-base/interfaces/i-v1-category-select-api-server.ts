import { Observable } from "rxjs";

export interface IV1CategorySelectApiServer {
    getAll(organId?: string): Observable<any>;
}
