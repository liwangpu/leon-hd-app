import { Component, OnInit } from '@angular/core';
import { V1ListPageScheduleService } from './v1-list-page-schedule.service';
import { ResourceService } from '../../../share/services/webapis/resource.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { UIListBSModel } from '../../../share/models/common';

@Component({
  selector: 'app-v1-list-page',
  templateUrl: './v1-list-page.component.html',
  styleUrls: ['./v1-list-page.component.scss'],
  providers: [V1ListPageScheduleService, ResourceService]
})
export class V1ListPageComponent implements OnInit {

  title: string;
  icon: string;
  constructor(protected route: ActivatedRoute, protected resourceSrv: ResourceService, protected scheduleSrv: V1ListPageScheduleService) {

  }//constructor

  ngOnInit() {
    this.route.data.subscribe((data: { model: UIListBSModel }) => {
      let model = data.model;
      //页面基本参数
      this.title = model.resource;
      this.icon = model.icon;
      this.resourceSrv.uriPart = model.resource;
      //中间服务参数传递
      this.scheduleSrv.columnDefs = model.fields;
      this.scheduleSrv.displayModel$.next(model.displayModel[0]);//默认显示第一个展示模式

      //默认查询
      this.resourceSrv.query().subscribe(datas => {
        this.scheduleSrv.datas$.next(datas);
        // console.log('query data ', datas);
      });
      console.log('list page get data ', model);
    });
  }//ngOnInit

}
