import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { PackageDetailMdService } from '../package-detail-md.service';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { GroupDetailListPanelDirective } from './group-detail-list-panel.directive';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { GroupListGroupMapsDialogTplsComponent } from './group-list-group-maps-dialog-tpls/group-list-group-maps-dialog-tpls.component';
import { PackageService } from '../../../../toolkit/server/webapi/package.service';
import { GroupListCategoryMapsDialogTplsComponent } from './group-list-category-maps-dialog-tpls/group-list-category-maps-dialog-tpls.component';
import { Package } from '../../../../toolkit/models/package';
import { GroupListMaterialMapsDialogTplsComponent } from './group-list-material-maps-dialog-tpls/group-list-material-maps-dialog-tpls.component';
import { GroupListReplacegroupMapsDialogTplsComponent } from './group-list-replacegroup-maps-dialog-tpls/group-list-replacegroup-maps-dialog-tpls.component';
import { AsyncHandleService } from '../../../services/async-handle.service';

@Component({
  selector: 'app-package-detail-group-detail-list',
  templateUrl: './group-detail-list.component.html',
  styleUrls: ['./group-detail-list.component.scss']
})
export class GroupDetailListComponent implements OnInit, AfterViewInit {


  selectedPanel = '';
  @ViewChildren(GroupDetailListPanelDirective) items: QueryList<GroupDetailListPanelDirective>;
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PackageDetailMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, private packageSrv: PackageService, private asyncHandle: AsyncHandleService) {

  }

  ngOnInit() {

  }//ngOnInit

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.mdSrv.afterAreaSelected$.takeUntil(this.destroy$).pipe(distinctUntilChanged()).subscribe(id => {
        this.onAreaChange(id);
      });
    }, 1000);

  }//ngAfterContentInit

  onAreaChange(id: string) {
    this.panelSelect('GroupsMap');
  }//onAreaChange


  panelSelect(name: string) {
    this.selectedPanel = name;
    this.items.forEach(x => {
      if (x.fid !== name)
        x.clearSelected();
      else
        x.seleteMe();
    });
  }//panelSelect

  addItem() {
    let pckContentIns = (this.packageSrv.editData$.getValue() as Package).contentIns;
    if (pckContentIns && pckContentIns.areas && pckContentIns.areas.length > 0) {
      if (this.selectedPanel === 'GroupsMap')
        this.addProductGroup();
      if (this.selectedPanel === 'ProductCategoryMap')
        this.addCategoryProduct();
      if (this.selectedPanel === 'MaterialMap')
        this.addMaterial();
      if (this.selectedPanel === 'ReplaceGroup')
        this.addReplaceGroup();
    }
  }//addItem

  addProductGroup() {
    let dialog = this.dialogFac.tplsConfirm(GroupListGroupMapsDialogTplsComponent, undefined, { width: '800px', height: '550px' });
    dialog.afterOpen().subscribe(_ => {
      let ins = (dialog.componentInstance.componentIns as GroupListGroupMapsDialogTplsComponent);
      ins.afterConfirm.subscribe(() => {
        let data = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productGroupId: ins.selectedGroupId };

        let source$ = this.packageSrv.AddProductGroup(data);
        this.asyncHandle.asyncRequest(source$).subscribe(_ => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });

      });//afterConfirm
    });//afterOpen
  }//addProductGroup

  addReplaceGroup() {
    let dialog = this.dialogFac.tplsConfirm(GroupListReplacegroupMapsDialogTplsComponent, undefined, { width: '800px', height: '550px' });
    dialog.afterOpen().subscribe(_ => {
      let ins = (dialog.componentInstance.componentIns as GroupListReplacegroupMapsDialogTplsComponent);
      ins.afterConfirm.subscribe(_ => {
        let data = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productIds: ins.selectedProductIds.join(',') };
        this.packageSrv.addReplaceGroup(data).subscribe(res => {
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
        ins.doneAsync.next();
      });//afterConfirm
    });//afterOpen
  }//addReplaceGroup

  addCategoryProduct() {
    let dialog = this.dialogFac.tplsConfirm(GroupListCategoryMapsDialogTplsComponent, undefined, { width: '800px', height: '550px' });
    dialog.afterOpen().subscribe(_ => {
      let ins = (dialog.componentInstance.componentIns as GroupListCategoryMapsDialogTplsComponent);
      ins.afterConfirm.subscribe(_ => {
        let data = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productId: ins.selectedId };

        let source$ = this.packageSrv.addCategoryProduct(data);
        this.asyncHandle.asyncRequest(source$).subscribe(_ => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });

      });//afterConfirm
    });//afterOpen
  }//addCategoryProduct

  addMaterial() {
    let dialog = this.dialogFac.tplsConfirm(GroupListMaterialMapsDialogTplsComponent, undefined, { width: '800px', height: '550px' });
    dialog.afterOpen().subscribe(_ => {
      let ins = (dialog.componentInstance.componentIns as GroupListMaterialMapsDialogTplsComponent);
      ins.afterConfirm.subscribe(_ => {

        let data = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, materialId: ins.selectedMaterialId };

        let source$ = this.packageSrv.editMaterial(data);
        this.asyncHandle.asyncRequest(source$).subscribe(_ => {
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });

      });//afterConfirm
    });//afterOpen
  }//addMaterial
}