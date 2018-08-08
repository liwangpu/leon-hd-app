import { BehaviorSubject, Observable } from "../../../../../../node_modules/rxjs";
import { DataSource } from "../../../../../../node_modules/@angular/cdk/table";

export class CustomListDataSource extends DataSource<any> {

    _dataSubject = new BehaviorSubject<Array<any>>([]);

    connect(): Observable<Array<any>> {
        return this._dataSubject;
    }

    disconnect() { }
}

export interface IPageChangeParam {
    previousPageIndex?: number;
    length: number;
    pageIndex: number;
    pageSize: number;
}