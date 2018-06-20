import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PackageService } from '../../../../../toolkit/server/webapi/package.service';
import { PackageDetailMdService } from '../../package-detail-md.service';
import { SnackbarService } from '../../../../../toolkit/common/services/snackbar.service';
import { DialogFactoryService } from '../../../../../toolkit/common/factory/dialog-factory.service';
import { Subject } from 'rxjs';
import { Package } from '../../../../../toolkit/models/package';
import { merge } from 'rxjs/observable/merge';
import { last } from 'rxjs/operator/last';


@Component({
  selector: 'app-package-detail-group-list-replacegroup-maps',
  templateUrl: './group-list-replacegroup-maps.component.html',
  styleUrls: ['./group-list-replacegroup-maps.component.scss']
})
export class GroupListReplacegroupMapsComponent implements OnInit {

  destroy$ = new Subject<boolean>();
  constructor(protected packageSrv: PackageService, protected mdSrv: PackageDetailMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {

  }//constructor

  ngOnInit() {
    // //订阅区域面板区域切换事件
    // this.mdSrv.afterAreaSelected$.takeUntil(this.destroy$).map(x => {
    //   let pck = this.packageSrv.editData$.getValue() as Package;
    //   let areas = pck.contentIns ? pck.contentIns.areas : [];
    //   let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
    //   return area && area.replaceGroupIns ? area.replaceGroupIns : [];
    // }).subscribe(groups => {
    //   console.log('rrrr', groups);
    //   // this.productDatas$.next(groups);
    // });//
    // //订阅套餐基本信息修改后更新事件
    // this.packageSrv.editData$.takeUntil(this.destroy$).map(x => {
    //   let pck = this.packageSrv.editData$.getValue() as Package;
    //   let areas = pck.contentIns ? pck.contentIns.areas : [];
    //   let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
    //   return area && area.replaceGroupIns ? area.replaceGroupIns : [];
    // }).subscribe(groups => {
    //   console.log('rrrr 1', groups);
    //   // this.productDatas$.next(groups);
    // });
    //订阅区域面板区域切换事件
    let obs1 = this.mdSrv.afterAreaSelected$.takeUntil(this.destroy$).map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.replaceGroupIns ? area.replaceGroupIns : [];
    });//
    //订阅套餐基本信息修改后更新事件
    let obs2 = this.packageSrv.editData$.takeUntil(this.destroy$).map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.replaceGroupIns ? area.replaceGroupIns : [];
    });

    // merge(obs1,obs2)..subscribe(datas=>{
    //   console.log('rrrr datas', datas);
    // })
  }//

}
