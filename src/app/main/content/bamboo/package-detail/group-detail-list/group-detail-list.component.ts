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

@Component({
  selector: 'app-package-detail-group-detail-list',
  templateUrl: './group-detail-list.component.html',
  styleUrls: ['./group-detail-list.component.scss']
})
export class GroupDetailListComponent implements OnInit, AfterViewInit {

  selectedPanel = '';
  @ViewChildren(GroupDetailListPanelDirective) items: QueryList<GroupDetailListPanelDirective>;
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PackageDetailMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {

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
    // console.log('area', id);
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
  }//addItem

  addProductGroup() {
    // alert(1);
    this.dialogFac.tplsConfirm(GroupListGroupMapsDialogTplsComponent, undefined, { width: '400px', height: '450px' });
  }//addProductGroup

}
