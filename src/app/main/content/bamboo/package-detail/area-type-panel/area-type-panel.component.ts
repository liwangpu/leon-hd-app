import { Component, OnInit, OnDestroy, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { PackageService } from '../../../../toolkit/server/webapi/package.service';
import { Subject } from 'rxjs';
import { Package } from '../../../../toolkit/models/package';
import { PackageArea } from '../../../../toolkit/models/package-content-item';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { AreaTypeSelectComponent } from '../area-type-select/area-type-select.component';
import { SimpleMessageContentComponent } from '../../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';
import { AreaTypePanelDirective } from './area-type-panel.directive';
import { PackageDetailMdService } from '../package-detail-md.service';
import { AsyncHandleService } from '../../../services/async-handle.service';

@Component({
  selector: 'app-package-detail-area-type-panel',
  templateUrl: './area-type-panel.component.html',
  styleUrls: ['./area-type-panel.component.scss']
})
export class AreaTypePanelComponent implements OnInit, OnDestroy, AfterViewInit {

  selectAreaId = '';
  packageId: string;
  areas: Array<PackageArea> = [];
  @ViewChildren(AreaTypePanelDirective) items: QueryList<AreaTypePanelDirective>;
  destroy$ = new Subject<boolean>();
  constructor(public apiSrv: PackageService, protected dialogFac: DialogFactoryService, public mdSrv: PackageDetailMdService, private asyncHandle: AsyncHandleService) {

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  ngOnInit() {
    this.apiSrv.editData$.takeUntil(this.destroy$).subscribe(res => {
      let data = res as Package;
      this.packageId = data.id;
      if (data.contentIns && data.contentIns.areas) {
        //转换一下,不需要存储这么多数据到area
        this.areas = data.contentIns.areas.map(x => {
          let r = new PackageArea();
          r.id = x.id;
          r.areaAlias = x.areaAlias;
          r.areaTypeId = x.areaTypeId;
          return r;
        });
      }
    });

  }//ngOnInit

  ngAfterViewInit(): void {
    //默认选中第一个区域
    if (this.areas && this.areas.length > 0) {
      setTimeout(() => {
        this.onAreaSelected(this.areas[0].id);
      }, 500);
    }
  }//ngAfterViewInit

  editArea(areaType?: PackageArea) {
    this.dialogFac.tplsConfirm(AreaTypeSelectComponent, '', {
      width: '400px', height: '350px', data: {
        areaType: areaType ? { packageId: this.packageId, areaAlias: areaType.areaAlias, areaTypeId: areaType.areaTypeId, id: areaType.id } : { packageId: this.packageId }
      }
    });
  }//addArea

  deleteArea(areaType: PackageArea) {
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: areaType.areaAlias } }, 'tips.Prompt', { width: '400px', height: '300px' });
    dialog.afterOpen().first().subscribe(() => {
      let ins = (dialog.componentInstance.componentIns as SimpleMessageContentComponent);
      ins.afterConfirm.subscribe(() => {
        let source$ = this.apiSrv.deleteAreaType({ id: areaType.id, packageId: this.packageId });
        this.asyncHandle.asyncRequest(source$).subscribe(_ => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//open

  }//deleteArea

  onAreaSelected(id: string) {
    this.mdSrv.afterAreaSelected$.next(id);
    this.items.forEach(x => {
      if (x.fid !== id)
        x.clearSelected();
      else
        x.seleteMe();
    });
    this.selectAreaId = id;
  }//onAreaSelected

  trackArea(index: number, data: PackageArea): string {
    return data.id;
  }//trackArea

}
