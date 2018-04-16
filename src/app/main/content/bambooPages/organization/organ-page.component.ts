import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { EcommerceProductsService } from './products.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { FuseUtils } from '../../../../core/fuseUtils';
import { OrganizeService } from '../../../shared/server/webapi/organize.service';
import { Organize } from '../../../shared/models/organize';
@Component({
    selector: 'app-organ-page',
    templateUrl: './organ-page.component.html',
    styleUrls: ['./organ-page.component.scss'],
    animations: fuseAnimations
})
export class OrganPageComponent implements OnInit {
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'name'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private organSrv: OrganizeService) {
    }

    ngOnInit() {
        this.dataSource = new FilesDataSource(this.organSrv, this.paginator, this.sort);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}

export class FilesDataSource extends DataSource<any>
{
    _filterChange = new BehaviorSubject('');
    _filteredDataChange = new BehaviorSubject('');
    organs: Array<Organize> = [];
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    constructor(private organSrv: OrganizeService, private _paginator: MatPaginator, private _sort: MatSort) {
        super();
        // this.filteredData = this.productsService.products;
        // this.filteredData=

    }

    connect(): Observable<any[]> {
        return Observable.of([{ id: '12323', name: 'leon' }]);
        // this.organSrv.query('', '', 1, 15, '', false).subscribe(rdata => {
        //     console.log(111, 'organ query', rdata);
        //     this.filteredData = rdata.data;
        // });
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    // connect(): Observable<any[]> {
    //     const displayDataChanges = [
    //         // this.productsService.onProductsChanged,
    //         this._paginator.page,
    //         this._filterChange,
    //         this._sort.sortChange
    //     ];

    //     return Observable.merge(...displayDataChanges).map(() => {
    //         let data = this.productsService.products.slice();

    //         data = this.filterData(data);

    //         this.filteredData = [...data];

    //         data = this.sortData(data);

    //         // Grab the page's slice of data.
    //         const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    //         return data.splice(startIndex, this._paginator.pageSize);
    //     });
    // }

    filterData(data) {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'categories':
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'quantity':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case 'active':
                    [propertyA, propertyB] = [a.active, b.active];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect() {
    }
}

