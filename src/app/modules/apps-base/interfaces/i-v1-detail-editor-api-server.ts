import { Observable } from "rxjs";
import { IEntity } from "micro-base";

export interface IV1DetailEditorApiServer {
    getById(id: string | number): Observable<IEntity>;
    update(entity: any): Observable<any>;
    changeIcon(entity: { objId: string, assetId: string }): Observable<any>;
}
