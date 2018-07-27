import { Component, OnInit, ComponentFactoryResolver, Input } from '@angular/core';
import { DialogFactoryService } from '../../../../share/common/factories/dialog-factory.service';
import { AsyncHandleService } from '../../../../share/services/common/async-handle.service';
import { YEditFormComponent } from './y-edit-form/y-edit-form.component';
import { PackageDetailMdService } from '../../package-detail-md.service';
import { PackageService } from '../../../../share/services/webapis/package.service';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { ProductGroup } from '../../../../share/models/product-group';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { Package } from '../../../../share/models/package';
import { SimpleMessageContentComponent } from '../../../../share/common/factories/dialog-template/simple-message-content/simple-message-content.component';

@Component({
  selector: 'app-package-detail-content-list-x-product-group',
  templateUrl: './x-product-group.component.html',
  styleUrls: ['./x-product-group.component.scss']
})
export class XProductGroupComponent implements OnInit {

  groupDatas$ = new BehaviorSubject<Array<ProductGroup>>([]);
  productGroups: Observable<Array<ProductGroup>>;
  @Input() areaId: string;
  destroy$ = new Subject<boolean>();
  constructor(protected dialogFac: DialogFactoryService, private asyncHandle: AsyncHandleService, protected componentFactoryResolver: ComponentFactoryResolver, protected mdSrv: PackageDetailMdService, protected packageSrv: PackageService) {
    this.productGroups = this.groupDatas$.pipe(takeUntil(this.destroy$));
  }//constructor

  addItem() {
    let dialog = this.dialogFac.lazyModelEntryConfirm(YEditFormComponent, this.componentFactoryResolver, 'dialog.EditProductGroup', {
      width: '850px', height: '600px', data: {}
    });

    dialog.afterOpen().subscribe(() => {
      let ins = dialog.componentInstance.componentIns.lazyEntryIns as YEditFormComponent;
      ins.afterConfirm.subscribe(() => {

        let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productGroupId: ins.idsArr[0] };
        let source$ = this.packageSrv.AddProductGroup(model);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });
    });//afterOpen
  }//addProductGroup

  ngOnInit() {

    //订阅区域面板区域切换事件
    let obs1 = this.mdSrv.afterAreaSelected$.pipe(takeUntil(this.destroy$)).pipe(map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.groupsMapIns ? area.groupsMapIns : [];
    }));
    // //订阅套餐基本信息修改后更新事件
    let obs2 = this.packageSrv.editData$.pipe(takeUntil(this.destroy$)).pipe(map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.groupsMapIns ? area.groupsMapIns : [];
    }));
    merge(obs1, obs2).pipe(distinctUntilChanged()).subscribe(datas => {
      this.groupDatas$.next(datas);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


  trackProductGroup(data?: ProductGroup): string | undefined {
    return data ? data.id : '';
  }//

  deleteGroup(data: { id: string, name: string }) {
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: data.name } });

    dialog.afterOpen().subscribe(() => {
      let ins: SimpleMessageContentComponent = dialog.componentInstance.componentIns;
      ins.afterConfirm.subscribe(() => {
        let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productGroupId: data.id };
        let source$ = this.packageSrv.deleteProductGroup(model);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//afterOpen
  }//deleteGroup
}
