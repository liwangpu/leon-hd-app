import { Injectable } from '@angular/core';
import { AssetCategoryService } from './asset-category.service';
import { HttpClient } from '@angular/common/http';
import { ProductGroupCategory } from '../models/product-group-category';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class ProductGroupCategoryService extends AssetCategoryService<ProductGroupCategory> {

  type = 'product-group';
  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
  }//constructor

}
