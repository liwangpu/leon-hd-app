import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { EcommerceProductsService } from './products.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { FuseUtils } from '../../../../core/fuseUtils';
import { PaginatorStore } from "../../../toolkit/common/classes/paginator-store";
import { Product } from '../../../toolkit/models/product';
import { ProductService } from "../../../toolkit/server/webapi/product.service";
@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: fuseAnimations
})
export class ProductComponent implements OnInit {
  productItems: any[];
  dataStore: PaginatorStore<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor(private productSrv: ProductService) {

  }

  ngOnInit() {
    this.dataStore = new PaginatorStore<Product>({ service: this.productSrv, paginator: this.paginator, searchInputEle: this.filter });
    this.dataStore._dataSubject.subscribe(res => {
      // console.log(111, 'ps', res);
      // if (res.total)
        this.productItems = res.data;
    });
  }
}

class myDataSource extends DataSource<any> {
  connect(): Observable<any[]> {
    return Observable.of([{ name: 'Hello', age: 7 }, { name: 'good', age: 1 }]);
  }
  disconnect(): void {

  }
}


// export class FilesDataSource extends DataSource<any>
// {
//     _filterChange = new BehaviorSubject('');
//     _filteredDataChange = new BehaviorSubject('');

//     get filteredData(): any {
//         return this._filteredDataChange.value;
//     }

//     set filteredData(value: any) {
//         this._filteredDataChange.next(value);
//     }

//     get filter(): string {
//         return this._filterChange.value;
//     }

//     set filter(filter: string) {
//         this._filterChange.next(filter);
//     }

//     constructor(
//         private productsService: EcommerceProductsService,
//         private _paginator: MatPaginator,
//         private _sort: MatSort
//     ) {
//         super();
//         this.filteredData = this.productsService.products;
//     }

//     /** Connect function called by the table to retrieve one stream containing the data to render. */
//     connect(): Observable<any[]> {


//         const displayDataChanges = [
//             this.productsService.onProductsChanged,
//             this._paginator.page,
//             this._filterChange,
//             this._sort.sortChange
//         ];

//         console.log('connect runing:', displayDataChanges);

//         return Observable.merge(...displayDataChanges).map(() => {
//             let data = this.productsService.products.slice();

//             console.log('merge data', data);
//             data = this.filterData(data);

//             this.filteredData = [...data];

//             data = this.sortData(data);

//             // Grab the page's slice of data.
//             const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//             return data.splice(startIndex, this._paginator.pageSize);
//         });
//     }

//     filterData(data) {
//         if (!this.filter) {
//             return data;
//         }
//         return FuseUtils.filterArrayByString(data, this.filter);
//     }

//     sortData(data): any[] {
//         if (!this._sort.active || this._sort.direction === '') {
//             return data;
//         }

//         return data.sort((a, b) => {
//             let propertyA: number | string = '';
//             let propertyB: number | string = '';

//             switch (this._sort.active) {
//                 case 'id':
//                     [propertyA, propertyB] = [a.id, b.id];
//                     break;
//                 case 'name':
//                     [propertyA, propertyB] = [a.name, b.name];
//                     break;
//                 case 'categories':
//                     [propertyA, propertyB] = [a.categories[0], b.categories[0]];
//                     break;
//                 case 'price':
//                     [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
//                     break;
//                 case 'quantity':
//                     [propertyA, propertyB] = [a.quantity, b.quantity];
//                     break;
//                 case 'active':
//                     [propertyA, propertyB] = [a.active, b.active];
//                     break;
//             }

//             const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//             const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//             return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
//         });
//     }

//     disconnect() {
//     }
// }
