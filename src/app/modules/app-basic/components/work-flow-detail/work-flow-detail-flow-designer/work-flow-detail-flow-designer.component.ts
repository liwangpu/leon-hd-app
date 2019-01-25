import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WorkFlowDetailFlowFormComponent } from '../work-flow-detail-flow-form/work-flow-detail-flow-form.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { WorkFlowItem, UserRoleService, WorkFlowService, WorkFlow } from 'micro-app-basic';
import { DialogFactoryService, AsyncHandleService } from 'scaffold-app-minor';
import { IQueryFilter, QueryOperateEnum } from 'micro-base';


@Component({
  selector: 'app-work-flow-detail-flow-designer',
  templateUrl: './work-flow-detail-flow-designer.component.html',
  styleUrls: ['./work-flow-detail-flow-designer.component.scss']
})
export class WorkFlowDetailFlowDesignerComponent implements OnInit, AfterViewInit, OnDestroy {

  workFlowId: string;
  workFlowItems: Array<WorkFlowItem> = [];
  usableUserRoles: Array<{ id: string, name: string }> = [];
  destroy$ = new Subject<boolean>();
  constructor(protected interactSrv: DetailEditorInteractService, protected dialogSrv: DialogFactoryService, protected workFlowSrv: WorkFlowService, protected asyncHandleSrv: AsyncHandleService, protected userRoleSrv: UserRoleService) {

  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.pipe(takeUntil(this.destroy$)).subscribe((data: WorkFlow) => {
      if (!data) return;
      this.workFlowId = data.id;
      this.workFlowItems = data.workFlowItems && data.workFlowItems.length > 0 ? data.workFlowItems : [];

      let advanceFilters: Array<IQueryFilter> = [
        {
          field: 'organType',
          value: data.applyOrgans,
          operate: QueryOperateEnum.equal
        },
        {
          field: 'excludeInner',
          value: true,
          operate: QueryOperateEnum.equal
        }
      ];
      this.userRoleSrv.query({ page: 1, pageSize: 999 }, advanceFilters).subscribe(res => {
        this.usableUserRoles = res.data && res.data.length > 0 ? res.data.map(x => { return { id: x.id, name: x.name }; }) : [];
      });
    });

  }//ngOnInit

  ngAfterViewInit(): void {

    // this.userRoleSrv.query();
  }//ngAfterViewInit


  ngOnDestroy(): void {

  }//ngOnDestroy

  onEditFlow(id?: string) {
    let refItem = id ? this.workFlowItems.filter(x => x.id == id)[0] : new WorkFlowItem();
    refItem.workFlowId = this.workFlowId;
    let dialogRef = this.dialogSrv.open(WorkFlowDetailFlowFormComponent, {
      width: '600px',
      height: '480px',
      disableClose: true,
      data: { WorkFlowItem: refItem, UsableUserRoles: this.usableUserRoles }
    });

    dialogRef.componentInstance.afterRefreshData.subscribe((data: WorkFlow) => {
      this.workFlowItems = data.workFlowItems;
      dialogRef.close();
    });
  }//onEditFlow

  onDeleteFlow(id: string) {
    let source$ = this.workFlowSrv.deleteWorkFlowItem({
      id: id,
      workFlowId: this.workFlowId
    });
    this.asyncHandleSrv.asyncRequest(source$).subscribe(() => {
      this.workFlowItems = this.workFlowItems.filter(x => x.id != id);
    });//subscribe
  }//onDeleteFlow

  onMoveFlowItem(event: CdkDragDrop<string[]>) {
    let flowId = event.item.element.nativeElement.getAttribute('data-id');
    let refItem = this.workFlowItems.filter(x => x.id == flowId)[0];
    refItem.flowGrade = event.currentIndex;
    refItem.workFlowId = this.workFlowId;
    let source$ = this.workFlowSrv.updateWorkFlowItem(refItem);
    this.asyncHandleSrv.asyncRequest(source$, true).subscribe(res => {
      moveItemInArray(this.workFlowItems, event.previousIndex, event.currentIndex);
    });//subscribe
  }

}
