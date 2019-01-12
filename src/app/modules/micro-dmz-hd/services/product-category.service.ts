import { Injectable } from '@angular/core';
import { AssetCategoryService } from './asset-category.service';
import { ProductCategory } from '../models/product-category';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class ProductCategoryService extends AssetCategoryService<ProductCategory> {

  type = 'product';
  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
  }//constructor

}
