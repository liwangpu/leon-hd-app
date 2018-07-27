import { Component, OnInit } from '@angular/core';
import { MaterialPaginatorLaunchService } from './material-paginator-launch.service';
import { MaterialLeftCategoryLaunchService } from './material-left-category-launch.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  providers: [MaterialPaginatorLaunchService, MaterialLeftCategoryLaunchService]
})
export class MaterialComponent implements OnInit {

  constructor(public launch: MaterialPaginatorLaunchService, public leftCategoyMdSrv: MaterialLeftCategoryLaunchService) { }

  ngOnInit() {
  }

}
