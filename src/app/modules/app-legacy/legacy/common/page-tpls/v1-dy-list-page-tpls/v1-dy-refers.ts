import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable } from "rxjs";


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