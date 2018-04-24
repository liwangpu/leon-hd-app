import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from "../../../toolkit/models/product";
import { ProductSpec } from "../../../toolkit/models/productspec";
@Injectable()
export class ProductDetailService {
    product: Product;
    currentEditSpec: ProductSpec;
    afterProductChange = new Subject<Product>();
    afterProductSpecChange = new Subject<ProductSpec>();
    onProductSpecSelected = new BehaviorSubject<ProductSpec>(null);
    onLeftSidenavViewChanged = new Subject<any>();
    onRightSidenavViewChanged = new Subject<any>();
    constructor() {

    }


    getCharlet(specId: string) {


    }

}
