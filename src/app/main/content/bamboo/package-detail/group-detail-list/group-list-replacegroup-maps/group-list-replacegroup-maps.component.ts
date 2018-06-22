import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PackageService } from '../../../../../toolkit/server/webapi/package.service';
import { PackageDetailMdService } from '../../package-detail-md.service';
import { SnackbarService } from '../../../../../toolkit/common/services/snackbar.service';
import { DialogFactoryService } from '../../../../../toolkit/common/factory/dialog-factory.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Package } from '../../../../../toolkit/models/package';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';
import { Product } from '../../../../../toolkit/models/product';
import { SimpleMessageContentComponent } from '../../../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';


@Component({
  selector: 'app-package-detail-group-list-replacegroup-maps',
  templateUrl: './group-list-replacegroup-maps.component.html',
  styleUrls: ['./group-list-replacegroup-maps.component.scss']
})
export class GroupListReplacegroupMapsComponent implements OnInit {

  datas$ = new BehaviorSubject<Array<Array<Product>>>([]);
  destroy$ = new Subject<boolean>();
  constructor(protected packageSrv: PackageService, protected mdSrv: PackageDetailMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {

  }//constructor

  ngOnInit() {
    // 订阅区域面板区域切换事件
    let obs1 = this.mdSrv.afterAreaSelected$.takeUntil(this.destroy$).pipe(map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.replaceGroupIns ? area.replaceGroupIns : [];
    }));//
    // 订阅套餐基本信息修改后更新事件
    let obs2 = this.packageSrv.editData$.takeUntil(this.destroy$).pipe(map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.replaceGroupIns ? area.replaceGroupIns : [];
    }));
    merge(obs1, obs2).subscribe(datas => {
      this.datas$.next(datas);
    });
  }//

  deleteGroup(data: { id: string, name: string }) {
    this.tranSrv.get('message.DeleteConfirm', { value: data.name }).subscribe(tips => {
      let dialog = this.dialogFac.simpleConfirm(tips);
      dialog.afterOpen().subscribe(_ => {
        let ins = dialog.componentInstance.componentIns as SimpleMessageContentComponent;
        ins.afterConfirm.subscribe(_ => {
          let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productId: data.id };
          //
          this.packageSrv.deleteReplaceGroup(model).subscribe(_ => {
            this.tranSrv.get('message.SaveSuccessfully').subscribe(msg => {
              this.snackBarSrv.simpleBar(msg);
            });
          }, err => {
            this.tranSrv.get('message.OperationError', { value: err }).subscribe(msg => {
              this.snackBarSrv.simpleBar(msg);
            });
          }, () => {
            ins.doneAsync.next();
            ins.closeDialog.next();
          });
        });
      });//afterOpen
    });//get
  }//deleteGroup

  setDefaultReplace(data: { id: string, name: string, defaultId: string }) {
    let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productId: data.id, defaultId: data.defaultId };
    this.packageSrv.setDefaultReplaceGroup(model).subscribe(_ => {
    }, err => {
      this.tranSrv.get('message.OperationError', { value: err }).subscribe(msg => {
        this.snackBarSrv.simpleBar(msg);
      });
    });
  }//setDefaultReplace

  deleteGroupDetailItem(data: { id: string, name: string, defaultId: string }) {
    let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productId: data.id, defaultId: data.defaultId };
    this.packageSrv.deleteReplaceGroupDetailItem(model).subscribe(_ => {
    }, err => {
      this.tranSrv.get('message.OperationError', { value: err }).subscribe(msg => {
        this.snackBarSrv.simpleBar(msg);
      });
    });
  }//deleteGroupDetailItem

}
