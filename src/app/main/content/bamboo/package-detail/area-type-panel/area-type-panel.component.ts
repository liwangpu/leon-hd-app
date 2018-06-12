import { Component, OnInit, OnDestroy, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { AreaType } from '../../../../toolkit/models/area-type';
import { PackageService } from '../../../../toolkit/server/webapi/package.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Package } from '../../../../toolkit/models/package';
import { PackageArea } from '../../../../toolkit/models/package-content-item';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { AreaTypeSelectComponent } from '../area-type-select/area-type-select.component';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleMessageContentComponent } from '../../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';
import { AreaTypePanelDirective } from './area-type-panel.directive';
import { PackageDetailMdService } from '../package-detail-md.service';

@Component({
  selector: 'app-package-detail-area-type-panel',
  templateUrl: './area-type-panel.component.html',
  styleUrls: ['./area-type-panel.component.scss']
})
export class AreaTypePanelComponent implements OnInit, OnDestroy, AfterViewInit {

  packageId: string;
  areas: Array<PackageArea> = [];
  @ViewChildren(AreaTypePanelDirective) items: QueryList<AreaTypePanelDirective>;
  destroy$ = new Subject<boolean>();
  constructor(public apiSrv: PackageService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, public mdSrv: PackageDetailMdService) {

    // for (let idx = 0; idx < 5; idx++) {
    //   let t = new AreaType();
    //   t.id = '' + idx;
    //   t.name = '区域' + idx;
    //   this.areaTypes.push(t);
    // }
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
      this.onAreaSelected(this.areas[0].id);
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
    // this.dialogFac.simpleConfirm();

    let ins: SimpleMessageContentComponent;
    let tipTranAsync = () => {
      return new Promise((resolve, reject) => {
        this.tranSrv.get('message.DeleteConfirm', { value: areaType.areaAlias }).first().subscribe(msg => resolve(msg));
      });//Promise
    };


    let dialogAsync = (msg) => {
      return new Promise((resolve, reject) => {
        let dialog = this.dialogFac.simpleConfirm(msg, '', { width: '400px', height: '300px' });
        dialog.afterOpen().first().subscribe(() => {
          ins = (dialog.componentInstance.componentIns as SimpleMessageContentComponent);
          ins.afterConfirm.subscribe(() => {
            resolve();
          });
        });//open
      });//Promise
    };//dialogAsync

    let deleteAsync = () => {
      return new Promise((resolve, reject) => {
        this.apiSrv.deleteAreaType({ id: areaType.id, packageId: this.packageId }).first().subscribe(_ => {
          resolve({ k: 'message.DeleteSuccessfully' });
        }, err => {
          resolve({ k: 'message.OperationError', v: { value: err }, e: true });
        });
      });//Promise
    };//deleteAsync


    let transAsync = (mobj: { k: string, v: any, e: boolean }) => {
      return new Promise((resolve, reject) => {
        this.tranSrv.get(mobj.k, mobj.v).first().subscribe(msg => {
          resolve(msg);
        });
      });//Promise
    };//transAsync

    tipTranAsync().then(dialogAsync).then(deleteAsync).then(transAsync).then(msg => {
      this.snackBarSrv.simpleBar(msg as string);
      ins.doneAsync.next();
      ins.closeDialog.next();
    });
  }//deleteArea

  onAreaSelected(id: string) {
    this.mdSrv.afterAreaSelected$.next(id);
    this.items.forEach(x => {
      if (x.fid !== id)
        x.clearSelected();
      else
        x.seleteMe();
    });
  }//onAreaSelected

  trackArea(index: number, data: PackageArea): string {
    return data.id;
  }//trackArea

}
