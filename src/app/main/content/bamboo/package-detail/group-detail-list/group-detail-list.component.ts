import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { PackageDetailMdService } from '../package-detail-md.service';
import { Subject } from 'rxjs';
import { distinct } from 'rxjs/operator/distinct';
import { distinctUntilChanged } from 'rxjs/operators';
import { GroupDetailListPanelDirective } from './group-detail-list-panel.directive';
import { takeWhile } from 'rxjs/operator/takeWhile';

@Component({
  selector: 'app-package-detail-group-detail-list',
  templateUrl: './group-detail-list.component.html',
  styleUrls: ['./group-detail-list.component.scss']
})
export class GroupDetailListComponent implements OnInit, AfterViewInit {

  selectedPanel = '';
  @ViewChildren(GroupDetailListPanelDirective) items: QueryList<GroupDetailListPanelDirective>;
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PackageDetailMdService) {

  }

  ngOnInit() {

  }//ngOnInit

  ngAfterViewInit(): void {

    // console.log('view init');
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
  }//
}
