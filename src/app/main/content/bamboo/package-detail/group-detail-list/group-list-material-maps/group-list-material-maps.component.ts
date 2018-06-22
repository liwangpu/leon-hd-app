import { Component, OnInit, Input } from '@angular/core';
import {  Subject } from 'rxjs';
import { PackageService } from '../../../../../toolkit/server/webapi/package.service';
import { PackageDetailMdService } from '../../package-detail-md.service';
import { DialogFactoryService } from '../../../../../toolkit/common/factory/dialog-factory.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../../toolkit/common/services/snackbar.service';
import { PackageMaterial } from '../../../../../toolkit/models/package-content-item';
import { Package } from '../../../../../toolkit/models/package';
import { SimpleMessageContentComponent } from '../../../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';

@Component({
  selector: 'app-package-detail-group-list-material-maps',
  templateUrl: './group-list-material-maps.component.html',
  styleUrls: ['./group-list-material-maps.component.scss']
})
export class GroupListMaterialMapsComponent implements OnInit {

  materials: Array<PackageMaterial>;
  @Input() areaId: string;
  destroy$ = new Subject<boolean>();
  constructor(protected packageSrv: PackageService, protected mdSrv: PackageDetailMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {
    // this.productGroups = this.groupDatas$.takeUntil(this.destroy$);
  }//constructor

  ngOnInit() {
    //订阅区域面板区域切换事件
    this.mdSrv.afterAreaSelected$.takeUntil(this.destroy$).map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.materialIns ? area.materialIns : [];
    }).subscribe(groups => {
      this.materials = groups;
    });//
    //订阅套餐基本信息修改后更新事件
    this.packageSrv.editData$.takeUntil(this.destroy$).map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.materialIns ? area.materialIns : [];
    }).subscribe(groups => {
      this.materials = groups;
    });
  }//

  onMaterialSubmit(data: { id: string, name: string, lastName: string }) {
    let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, actorName: data.name, lastActorName: data.lastName, materialId: data.id };
    this.packageSrv.editMaterial(model).subscribe(_ => {
      this.tranSrv.get('message.SaveSuccessfully').subscribe(msg => {
        this.snackBarSrv.simpleBar(msg);
      });
    }, err => {
      this.tranSrv.get('message.OperationError', { value: err }).subscribe(msg => {
        this.snackBarSrv.simpleBar(msg);
      });
    });
  }//onMaterialSubmit

  onMaterialDelete(data: { id: string, name: string, lastName: string }) {
    // console.log('onMaterialDelete', data);
    this.tranSrv.get('message.DeleteConfirm', { value: data.name }).subscribe(tips => {
      let dialog = this.dialogFac.simpleConfirm(tips);
      dialog.afterOpen().subscribe(_ => {
        let ins = dialog.componentInstance.componentIns as SimpleMessageContentComponent;
        ins.afterConfirm.subscribe(_ => {
          let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, actorName: data.name, lastActorName: data.lastName, materialId: data.id };
          //
          this.packageSrv.deleteMaterial(model).subscribe(_ => {
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
  }//onMaterialDelete

}
