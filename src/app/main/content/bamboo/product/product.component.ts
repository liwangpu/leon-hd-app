import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { PathService } from '../../services/path.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: fuseAnimations
})
export class ProductComponent implements OnInit, OnDestroy {

  productItems: any[];
  dataStore: PaginatorStore<Product>;
  destroy$: Subject<boolean> = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor(private productSrv: ProductService, private pathSrv: PathService) {

  }

  ngOnInit() {
    this.dataStore = new PaginatorStore<Product>({ service: this.productSrv, paginator: this.paginator, searchInputEle: this.filter });
    this.dataStore._dataSubject.takeUntil(this.destroy$).subscribe(res => {
      this.paginator.length=res.total;
      this.productItems = res.data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
