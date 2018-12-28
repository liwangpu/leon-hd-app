import { BehaviorSubject, Observable } from "rxjs";

export class PagingDataSource {
    _dataSubject = new BehaviorSubject<Array<any>>([]);

    connect(): Observable<Array<any>> {
        return this._dataSubject;
    }

    disconnect() { }
}
