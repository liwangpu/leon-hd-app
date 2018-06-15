import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../../../../../toolkit/models/product';
import { PackageDetailMdService } from '../../package-detail-md.service';
import { PackageService } from '../../../../../toolkit/server/webapi/package.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../../toolkit/common/services/snackbar.service';
import { DialogFactoryService } from '../../../../../toolkit/common/factory/dialog-factory.service';
import { Package } from '../../../../../toolkit/models/package';
import { SimpleMessageContentComponent } from '../../../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';

@Component({
  selector: 'app-package-group-list-category-maps',
  templateUrl: './group-list-category-maps.component.html',
  styleUrls: ['./group-list-category-maps.component.scss']
})
export class GroupListCategoryMapsComponent implements OnInit {

  products: Observable<Array<Product>>;
  @Input() areaId: string;
  destroy$ = new Subject<boolean>();
  productDatas$ = new BehaviorSubject<Array<Product>>([]);
  constructor(protected packageSrv: PackageService, protected mdSrv: PackageDetailMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {
    this.products = this.productDatas$.takeUntil(this.destroy$);
  }//constructor

  ngOnInit() {
    //订阅区域面板区域切换事件
    this.mdSrv.afterAreaSelected$.takeUntil(this.destroy$).map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.productCategoryMapIns ? area.productCategoryMapIns : [];
    }).subscribe(groups => {
      this.productDatas$.next(groups);
    });//
    //订阅套餐基本信息修改后更新事件
    this.packageSrv.editData$.takeUntil(this.destroy$).map(x => {
      let pck = this.packageSrv.editData$.getValue() as Package;
      let areas = pck.contentIns ? pck.contentIns.areas : [];
      let area = areas.filter(n => n.id == this.mdSrv.afterAreaSelected$.getValue())[0];
      return area && area.productCategoryMapIns ? area.productCategoryMapIns : [];
    }).subscribe(groups => {
      this.productDatas$.next(groups);
    });
  }//ngOnInit

  trackProduct(data?: Product): string | undefined {
    return data ? data.id : '';
  }//

  deleteProduct(data: { id: string, name: string }) {
    this.tranSrv.get('message.DeleteConfirm', { value: data.name }).subscribe(tips => {
      let dialog = this.dialogFac.simpleConfirm(tips);
      dialog.afterOpen().subscribe(_ => {
        let ins = dialog.componentInstance.componentIns as SimpleMessageContentComponent;
        ins.afterConfirm.subscribe(_ => {
          let model = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productId: data.id };
          //
          this.packageSrv.deleteCategoryProduct(model).subscribe(_ => {
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
        });//afterConfirm
      });//afterOpen
    });//get
  }//deleteProduct

}
