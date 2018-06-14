import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { PackageDetailMdService } from '../package-detail-md.service';
import { Subject } from 'rxjs';
import { distinct } from 'rxjs/operator/distinct';
import { distinctUntilChanged } from 'rxjs/operators';
import { GroupDetailListPanelDirective } from './group-detail-list-panel.directive';
import { takeWhile } from 'rxjs/operator/takeWhile';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { GroupListGroupMapsDialogTplsComponent } from './group-list-group-maps-dialog-tpls/group-list-group-maps-dialog-tpls.component';
import { SimpleConfirmDialogTplsComponent } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { PackageService } from '../../../../toolkit/server/webapi/package.service';
import { GroupListCategoryMapsDialogTplsComponent } from './group-list-category-maps-dialog-tpls/group-list-category-maps-dialog-tpls.component';

@Component({
  selector: 'app-package-detail-group-detail-list',
  templateUrl: './group-detail-list.component.html',
  styleUrls: ['./group-detail-list.component.scss']
})
export class GroupDetailListComponent implements OnInit, AfterViewInit {

  selectedPanel = '';
  @ViewChildren(GroupDetailListPanelDirective) items: QueryList<GroupDetailListPanelDirective>;
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PackageDetailMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, private packageSrv: PackageService) {

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
    if (this.selectedPanel === 'GroupsMap')
      this.addProductGroup();
    if (this.selectedPanel === 'ProductCategoryMap')
      this.addCategoryProduct();
  }//addItem

  addProductGroup() {
    let dialog = this.dialogFac.tplsConfirm(GroupListGroupMapsDialogTplsComponent, undefined, { width: '400px', height: '450px' });
    dialog.afterOpen().subscribe(_ => {
      let ins = (dialog.componentInstance.componentIns as GroupListGroupMapsDialogTplsComponent);
      ins.afterConfirm.subscribe(() => {
        let data = { areaId: this.mdSrv.afterAreaSelected$.getValue(), packageId: this.packageSrv.editData$.getValue().id, productGroupId: ins.selectedGroup.id };
        //
        this.packageSrv.AddProductGroup(data).subscribe(res => {
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
        });//AddProductGroup
      });//afterConfirm
    });//afterOpen
  }//addProductGroup

  addCategoryProduct() {
    let dialog = this.dialogFac.tplsConfirm(GroupListCategoryMapsDialogTplsComponent, undefined, { width: '400px', height: '450px' });
    dialog.afterOpen().subscribe(_ => {
      let ins = (dialog.componentInstance.componentIns as GroupListCategoryMapsDialogTplsComponent);
      ins.afterConfirm.subscribe(() => {
        console.log('yyyyyyyyy');
      });//afterConfirm
    });//afterOpen
  }//addCategoryProduct
}
