import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IListViewAdvanceMenu } from '../../../interfaces/i-list-view-advance-menu';
import { Subject } from 'rxjs';

@Component({
  selector: 'page-plate-common-manage-bar',
  templateUrl: './common-manage-bar.component.html',
  styleUrls: ['./common-manage-bar.component.scss']
})
export class CommonManageBarComponent implements OnInit {

  lastMode: string = null;
  selected = false;
  @Input() readOnly = true;
  @Input() pageModels: Array<string> = [];
  @Input() permissionPoints: Array<string> = [];
  @Input() advanceMenus: Array<IListViewAdvanceMenu> = [];
  @Input() selectedItems: Array<string> = [];
  @Output() refresh = new EventEmitter<void>();
  @Output() pageModelChange = new EventEmitter<string>();
  @Output() selectChange = new EventEmitter<boolean>();
  @Output() toggleColumnPanel = new EventEmitter();
  destroy$ = new Subject<boolean>();
  constructor() { }


  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  get hasSelectedItem() {
    return this.selectedItems && this.selectedItems.length > 0 ? true : false;
  }

  /**
   * 刷新页面
   */
  onRefresh() {
    this.refresh.next();
  }//onRefresh

  /**
   * 页面显示模式改变
   * @param mod 
   */
  displayModeChange(mod: string) {
    if (this.lastMode == null) 
    this.lastMode = this.pageModels[0];
    
    if (this.lastMode != mod) {
      this.selected = false;
      this.selectChange.next(this.selected);
    }
    this.pageModelChange.next(mod);
    this.lastMode = mod;
  }//displayModeChange

  /**
   * 页面选择模式改变
   */
  changeSelectedMode() {
    this.selected = !this.selected;
    this.selectChange.next(this.selected);
  }//changeSelectedMode

  checkPermission(point: string): boolean {
    // console.log(666, this.permissionPoints, point,this.advanceMenus);

    if (!point) return true;
    if (!this.permissionPoints || this.permissionPoints.length <= 0) return false;

    return this.permissionPoints.some(p => p.toLocaleLowerCase() == point.toLocaleLowerCase());
  }

  onToggleColumnPanel() {
    this.toggleColumnPanel.next();
  }//onToggleColumnPanel

}
