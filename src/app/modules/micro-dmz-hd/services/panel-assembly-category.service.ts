import { Injectable } from '@angular/core';
import { AssetCategoryService } from './asset-category.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { PanelAssemblyCategory } from '../models/panel-assembly-category';

@Injectable()
export class PanelAssemblyCategoryService extends AssetCategoryService<PanelAssemblyCategory> {

  type = 'PanelAssembly';
  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
  }//constructor

}
