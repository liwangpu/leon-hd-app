import { Injectable } from '@angular/core';
import { CommonCategoryService } from './common-category.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Injectable()
export class ProductgroupCategoryService extends CommonCategoryService {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.type = 'product-group';
  }

}
