import { Observable } from "rxjs";


export interface IV1CategoryApiServer {
    updateType(entity: any): Observable<any>;
    arrowDown(id: string): Observable<any>;
    arrowUp(id: string): Observable<any>;
    deleteType(id: string): Observable<any>;
    getFlat(organId?: string): Observable<Array<any>>;
}
