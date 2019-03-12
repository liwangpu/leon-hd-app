import { Injectable } from '@angular/core';
import { AssetCategoryService } from './asset-category.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { PanelCategory } from '../models/panel-category';

@Injectable()
export class PanelCategoryService extends AssetCategoryService<PanelCategory> {

  type = 'PanelProduct';
  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
  }//constructor

}
