import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductCategory } from '../../../toolkit/models/productcategory';

@Injectable()
export class ProductCategoryMdService {

  onMainCategorySelected$: Subject<Array<ProductCategory>> = new Subject();
  constructor() {

  }

}
