import { Injectable } from '@angular/core';
import { AssetCategoryService } from './asset-category.service';
import { HttpClient } from '@angular/common/http';
import { ProductGroupCategory } from '../models/product-group-category';

@Injectable()
export class ProductGroupCategoryService extends AssetCategoryService<ProductGroupCategory> {

  type = 'product-group';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }//constructor

}
