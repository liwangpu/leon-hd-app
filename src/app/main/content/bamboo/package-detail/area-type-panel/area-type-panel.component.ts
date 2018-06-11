import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreaType } from '../../../../toolkit/models/area-type';
import { PackageService } from '../../../../toolkit/server/webapi/package.service';
import { Subject } from 'rxjs';
import { Package } from '../../../../toolkit/models/package';
import { PackageArea } from '../../../../toolkit/models/package-content-item';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { AreaTypeSelectComponent } from '../area-type-select/area-type-select.component';

@Component({
  selector: 'app-package-detail-area-type-panel',
  templateUrl: './area-type-panel.component.html',
  styleUrls: ['./area-type-panel.component.scss']
})
export class AreaTypePanelComponent implements OnInit, OnDestroy {

  packageId: string;
  areaTypes: Array<AreaType> = [];
  areas: Array<PackageArea> = [];
  destroy$ = new Subject<boolean>();
  constructor(public apiSrv: PackageService, protected dialogFac: DialogFactoryService) {

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
        this.areaTypes = data.contentIns.areas.map(x => {
          let t = new AreaType();
          t.id = x.areaTypeId;
          t.name = x.areaAlias;
          return t;
        }) as Array<AreaType>;
        // console.log('edit', data);
      }


    });
  }//ngOnInit

  editArea(areaType?: AreaType) {
    console.log(222, areaType);
    this.dialogFac.tplsConfirm(AreaTypeSelectComponent, '', {
      width: '400px', height: '350px', data: {
        areaType: areaType ? { packageId: this.packageId, areaAlias: areaType.name, areaTypeId: areaType.id } : { packageId: this.packageId }
      }
    });




    // let deleteAsync = (tip) => {
    //   return new Promise((resolve) => {
    //     let dialog = this.dialogFac.tplsConfirm(BatchDeleteConfirmTplsComponent, '', { width: '400px', height: '250px' });
    //     dialog.afterOpen().first().subscribe(() => {
    //       ins = (dialog.componentInstance.componentIns as BatchDeleteConfirmTplsComponent);
    //       ins.msg = tip as string;
    //       ins.afterConfirm.first().subscribe(() => {
    //         this.mdSrv.apiSvr.batchDelete(this.mdSrv.selectedItems).first().subscribe(() => {
    //           this.mdSrv.queryData$.next();
    //           this.mdSrv.selectedItems = [];
    //           resolve({ k: 'message.DeleteSuccessfully' });
    //         }, err => {
    //           resolve({ k: 'message.OperationError', v: { value: err } });
    //         });
    //       });//afterConfirm
    //     });//open
    //   });//promise  
    // };

    // let trans2Async = (mobj: { k: string, v: any }) => {
    //   return new Promise((resolve) => {
    //     this.tranSrv.get(mobj.k, mobj.v).subscribe(msg => {
    //       resolve(msg);
    //     });
    //   });//promise
    // };//transAsync

    // transAsync().then(deleteAsync).then(trans2Async).then(msg => {
    //   this.snackBarSrv.simpleBar(msg as string);
    //   ins.doneAsync.next();
    //   ins.closeDialog.next();
    // });
  }//addArea

}
