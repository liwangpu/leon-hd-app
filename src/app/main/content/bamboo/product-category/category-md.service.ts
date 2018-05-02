import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductCategory } from '../../../toolkit/models/productcategory';

@Injectable()
export class CategoryMdService {

  afterCategorySelect$: Subject<ProductCategory> = new Subject();
  constructor() { }

}
