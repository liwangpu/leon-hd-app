import { Injectable } from '@angular/core';
import { AssetCategoryService } from './asset-category.service';
import { ProductCategory } from '../models/product-category';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductCategoryService extends AssetCategoryService<ProductCategory> {

  type = 'product';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }//constructor

}
