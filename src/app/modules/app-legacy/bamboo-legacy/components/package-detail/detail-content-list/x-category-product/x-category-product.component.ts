import { Component, OnInit, ComponentFactoryResolver, Input } from '@angular/core';
// import { DialogFactoryService } from '../../../../share/common/factories/dialog-factory.service';
// import { AsyncHandleService } from '../../../../share/services/common/async-handle.service';
import { PackageDetailMdService } from '../../package-detail-md.service';
// import { PackageService } from '../../../../share/services/webapis/package.service';
import { YEditFormComponent } from './y-edit-form/y-edit-form.component';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
// import { Product } from '../../../../share/models/product';
import { takeUntil, map } from 'rxjs/operators';
// import { Product } from '@app/app-legacy/models/product';
import { DialogFactoryService, AsyncHandleService, PackageService, SimpleMessageContentComponent, Product, Package } from '@app/app-legacy';
// import { Package } from '@app/app-legacy/models/package';
// import { Package } from '../../../../share/models/package';
// import { SimpleMessageContentComponent } from '../../../../share/common/factories/dialog-template/simple-message-content/simple-message-content.component';

@Component({
  selector: 'app-package-detail-content-list-x-category-product',
  templateUrl: './x-category-product.component.html',
  styleUrls: ['./x-category-product.component.scss']
})
export class XCategoryProductComponent implements OnInit {

  products: Observable<Array<Product>>;
  @Input() areaId: string;
  destroy$ = new Subject<boolean>();
  productDatas$ = new BehaviorSubject<Array<Product>>([]);
  constructor(protected dialogFac: DialogFactoryService, private asyncHandle: AsyncHandleService, protected componentFactoryResolver: ComponentFactoryResolver, protected mdSrv: PackageDetailMdService, protected packageSrv: PackageService) {
    this.products = this.productDatas$.pipe(takeUntil(this.destroy$));
  }

  addItem() {
    let dialog = this.dialogFac.lazyModelEntryConfirm(YEditFormComponent, this.componentFactoryResolver, 'dialog.EditCategoryReferProduct', {
      width: '850px', height: '600px', data: {}
    });

    dialog.afterOpen().subscribe(() => {
      let ins = dialog.componentInstance.componentIns.lazyEntryIns as YEditFormComponent;
      ins.afterConfirm.subscribe(() => {
        let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productId: ins.idsArr[0] };
        let source$ = this.packageSrv.addCategoryProduct(model);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });
    });//afterOpen
  }//addItem

  deleteItem(data: { id: string, name: string }) {
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: data.name } });

    dialog.afterOpen().subscribe(() => {
      let ins: SimpleMessageContentComponent = dialog.componentInstance.componentIns;
      ins.afterConfirm.subscribe(() => {
        let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productId: data.id };
        let source$ = this.packageSrv.deleteCategoryProduct(model);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//afterOpen
  }//deleteGroup


  ngOnInit() {
    //订阅区域面板区域切换事件
    this.mdSrv.afterAreaSelected$.pipe(takeUntil(this.destroy$)).pipe(map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.productCategoryMapIns ? area.productCategoryMapIns : [];
    })).subscribe(groups => {
      this.productDatas$.next(groups);
    });//
    //订阅套餐基本信息修改后更新事件
    this.packageSrv.editData$.pipe(takeUntil(this.destroy$)).pipe(map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.productCategoryMapIns ? area.productCategoryMapIns : [];
    })).subscribe(groups => {
      this.productDatas$.next(groups);
    });
  }//ngOnInit

  trackProduct(data?: Product): string | undefined {
    return data ? data.id : '';
  }//
}
