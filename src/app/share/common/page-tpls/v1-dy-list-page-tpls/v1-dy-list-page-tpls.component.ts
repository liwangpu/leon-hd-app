import { Component, OnInit } from '@angular/core';
import { V1ListPageScheduleService } from './v1-list-page-schedule.service';
import { ResourceService } from '../../../services/webapis/resource.service';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { UIListBSModel } from '../../../models/common';

@Component({
  selector: 'app-v1-dy-list-page-tpls',
  templateUrl: './v1-dy-list-page-tpls.component.html',
  styleUrls: ['./v1-dy-list-page-tpls.component.scss'],
  providers: [V1ListPageScheduleService, ResourceService]
})
export class V1DyListPageTplsComponent implements OnInit {

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
      this.scheduleSrv.columnDefs$.next(model.fields);
      this.scheduleSrv.pageSizeOptions$.next(model.pageSizeOptions);
      //分页参数发布后,更改一下默认分页参数,因为这两个数据不同步,也顺便执行默认搜索
      this.scheduleSrv.pageParam = { previousPageIndex: 0, pageIndex: 0, length: 0, pageSize: model.pageSizeOptions.length > 0 ? model.pageSizeOptions[0] : 10 };
      this.scheduleSrv.displayModel$.next(model.displayModel[0]);//默认显示第一个展示模式

      //默认查询
      // this.resourceSrv.query().subscribe(datas => {
      //   this.scheduleSrv.datas$.next(datas);
      //   // console.log('query data ', datas);
      // });
      console.log('list page get data ', model);
    });
  }//ngOnInit

}
