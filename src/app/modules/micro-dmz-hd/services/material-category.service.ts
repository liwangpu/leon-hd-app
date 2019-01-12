import { Injectable } from '@angular/core';
import { AssetCategoryService } from './asset-category.service';
import { HttpClient } from '@angular/common/http';
import { MaterialCategory } from '../models/material-category';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class MaterialCategoryService extends AssetCategoryService<MaterialCategory> {

  type = 'material';
  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
  }//constructor

}
