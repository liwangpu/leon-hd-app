import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
// import { DialogFactoryService } from '../../../../share/common/factories/dialog-factory.service';
// import { AsyncHandleService } from '../../../../share/services/common/async-handle.service';
import { PackageDetailMdService } from '../../package-detail-md.service';
// import { PackageService } from '../../../../share/services/webapis/package.service';
import { YEditFormComponent } from './y-edit-form/y-edit-form.component';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
// import { ProductReplaceGroup } from '../../../../share/models/product-replace-group';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
// import { ProductReplaceGroup } from '@app/app-legacy/models/product-replace-group';
import { AsyncHandleService, DialogFactoryService, PackageService, SimpleMessageContentComponent,ProductReplaceGroup,Package } from '@app/app-legacy';
// import { Package } from '@app/app-legacy/models/package';
// import { Package } from '../../../../share/models/package';
// import { SimpleMessageContentComponent } from '../../../../share/common/factories/dialog-template/simple-message-content/simple-message-content.component';

@Component({
  selector: 'app-package-detail-content-list-x-replace-group',
  templateUrl: './x-replace-group.component.html',
  styleUrls: ['./x-replace-group.component.scss']
})
export class XReplaceGroupComponent implements OnInit {

  datas$ = new BehaviorSubject<Array<ProductReplaceGroup>>([]);
  destroy$ = new Subject<boolean>();
  replaceGroups: Observable<Array<ProductReplaceGroup>>;
  constructor(protected dialogFac: DialogFactoryService, private asyncHandle: AsyncHandleService, protected componentFactoryResolver: ComponentFactoryResolver, protected mdSrv: PackageDetailMdService, protected packageSrv: PackageService) {
    this.replaceGroups = this.datas$.pipe(takeUntil(this.destroy$));
  }//constructor

  ngOnInit() {
    // //订阅套餐基本信息修改后更新事件
    let obs = this.packageSrv.editData$.pipe(takeUntil(this.destroy$)).pipe(map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let replaceGroups = pck.contentIns ? pck.contentIns.replaceGroupIns : [];
      return replaceGroups;
    }));
    obs.pipe(distinctUntilChanged()).subscribe(datas => {
      this.datas$.next(datas);
    });
  }//ngOnInit

  trackData(data?: ProductReplaceGroup): string | undefined {
    return data ? data.id : '';
  }//trackData

  addItem() {
    let dialog = this.dialogFac.lazyModelEntryConfirm(YEditFormComponent, this.componentFactoryResolver, 'dialog.EditProductGroup', {
      width: '850px', height: '600px', data: {}
    });

    dialog.afterOpen().subscribe(() => {
      let ins = dialog.componentInstance.componentIns.lazyEntryIns as YEditFormComponent;
      ins.afterConfirm.subscribe(() => {

        let model = { packageId: this.packageSrv.editData$.getValue().id, replaceGroupIds: ins.idsArr.join(',') };
        let source$ = this.packageSrv.addReplaceGroup(model);
        this.asyncHandle.asyncRequest(source$).subscribe((res) => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });
    });//afterOpen
  }//addProductGroup

  transDetails(details?: Array<ProductReplaceGroup>) {
    if (details && details.length > 0) {
      return details.map(x => x.name).join(',');
    }
    return '';
  }//transDetails

  deleteItem(data: { id: string, name: string }) {
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: data.name } });

    dialog.afterOpen().subscribe(() => {
      let ins: SimpleMessageContentComponent = dialog.componentInstance.componentIns;
      ins.afterConfirm.subscribe(() => {
        let model = { packageId: this.packageSrv.editData$.getValue().id, itemId: data.id };
        let source$ = this.packageSrv.deleteReplaceGroup(model);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//afterOpen
  }//deleteItem

}
