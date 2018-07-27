import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DialogFactoryService } from '../../../../share/common/factories/dialog-factory.service';
import { AsyncHandleService } from '../../../../share/services/common/async-handle.service';
import { PackageDetailMdService } from '../../package-detail-md.service';
import { PackageService } from '../../../../share/services/webapis/package.service';
import { YEditFormComponent } from './y-edit-form/y-edit-form.component';
import { PackageMaterial } from '../../../../share/models/package-content-item';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Package } from '../../../../share/models/package';
import { SimpleMessageContentComponent } from '../../../../share/common/factories/dialog-template/simple-message-content/simple-message-content.component';

@Component({
  selector: 'app-package-detail-content-list-x-material',
  templateUrl: './x-material.component.html',
  styleUrls: ['./x-material.component.scss']
})
export class XMaterialComponent implements OnInit {

  materials: Array<PackageMaterial>;
  destroy$ = new Subject<boolean>();
  constructor(protected dialogFac: DialogFactoryService, private asyncHandle: AsyncHandleService, protected componentFactoryResolver: ComponentFactoryResolver, protected mdSrv: PackageDetailMdService, protected packageSrv: PackageService) {


  }//constructor

  ngOnInit() {
    //订阅区域面板区域切换事件
    this.mdSrv.afterAreaSelected$.pipe(takeUntil(this.destroy$)).pipe(map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.materialIns ? area.materialIns : [];
    })).subscribe(groups => {
      this.materials = groups;
    });//
    //订阅套餐基本信息修改后更新事件
    this.packageSrv.editData$.pipe(takeUntil(this.destroy$)).pipe(map(() => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.materialIns ? area.materialIns : [];
    })).subscribe(groups => {
      this.materials = groups;
    });
  }

  addItem() {
    let dialog = this.dialogFac.lazyModelEntryConfirm(YEditFormComponent, this.componentFactoryResolver, 'dialog.EditCategoryReferProduct', {
      width: '850px', height: '600px', data: {}
    });

    dialog.afterOpen().subscribe(() => {
      let ins = dialog.componentInstance.componentIns.lazyEntryIns as YEditFormComponent;
      ins.afterConfirm.subscribe(() => {
        let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, actorName: '', lastActorName: '', materialId: ins.idsArr[0] };
        let source$ = this.packageSrv.editMaterial(model);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });
    });//afterOpen
  }//addItem

  onEditSubmit(data: { id: string, name: string, lastName: string }) {
    let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, actorName: data.name, lastActorName: data.lastName, materialId: data.id };
    let source$ = this.packageSrv.editMaterial(model);
    this.asyncHandle.asyncRequest(source$).subscribe();
  }//onEditSubmit

  onDelete(data: { id: string, name: string, lastName: string }) {
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: data.name } });

    dialog.afterOpen().subscribe(() => {
      let ins: SimpleMessageContentComponent = dialog.componentInstance.componentIns;
      ins.afterConfirm.subscribe(() => {
        let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, actorName: data.name, lastActorName: data.lastName, materialId: data.id };
        let source$ = this.packageSrv.deleteMaterial(model);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//afterOpen
  }//onMaterialDelete

}
