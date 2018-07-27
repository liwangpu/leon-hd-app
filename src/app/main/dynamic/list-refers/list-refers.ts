import { DataSource } from "../../../../../node_modules/@angular/cdk/table";
import { BehaviorSubject, Observable } from "../../../../../node_modules/rxjs";

export class CustomListDataSource extends DataSource<any> {

    _dataSubject = new BehaviorSubject<Array<{ seqno: number }>>([]);

    connect(): Observable<Array<{ seqno: number }>> {
        return this._dataSubject;
    }

    disconnect() { }
}
