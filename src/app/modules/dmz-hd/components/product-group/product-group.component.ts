import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Material, MaterialService, ProductGroupService } from '@geek/micro-dmz-hd';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';import { AsyncHandleService, DialogFactoryService } from '@geek/scaffold-app-minor';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from '@geek/apps-base';
import { ICommonTableColumndef, IListViewAdvanceMenu } from '@geek/scaffold-page-plate';
import { IQueryFilter, QueryOperateEnum } from '@geek/micro-base';
import { MaterialDetailCategoryFormComponent } from '../material-detail/material-detail-category-form/material-detail-category-form.component';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'ProductGroup';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , {
      id: 'categoryId', name: 'glossary.Category', width: 150, cell: (data: Material) => {
        return data.categoryName;
      }
    }
    , this._descriptionColumnDef
    , this._createdTime
  ];
  _changeCategoryAdvanceMenu: IListViewAdvanceMenu = {
    name: 'button.ChangeCategory',
    icon: 'swap_horiz',
    needSelectedItem: true,
    permissionPoint: 'change_category',
    onClick: (selectedIds: Array<string>) => {
      let dialogRef = this.dialogSrv.open(MaterialDetailCategoryFormComponent, {
        width: '450px',
        height: '600px',
        disableClose: true
      });

      dialogRef.componentInstance.afterSelected$.subscribe(item => {
        let source$ = this.apiSrv.bulkChangeCategory(selectedIds.join(','), item.id);
        this.asyncHandle.asyncRequest(source$).subscribe(() => {
          this._queryData();
        }, err => { }, () => {
          dialogRef.close();
          this.listViewCt.clearSelected();
        });
      });//subscribe
    }//onClick
  };
  advanceMenus: Array<IListViewAdvanceMenu> = [
    this._changeCategoryAdvanceMenu,
    this._deleteAdvanceMenu
  ];
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: ProductGroupService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe,protected dialogSrv: DialogFactoryService) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  onCategoryNodeSelected(id: string) {
    let filters: Array<IQueryFilter> = [];

    if (id)
      filters.push(
        {
          field: 'categoryId'
          , value: id
          , operate: QueryOperateEnum.equal
        }
      );
    else
      filters.push(
        {
          field: 'classify'
          , value: false
          , operate: QueryOperateEnum.equal
        }
      );

    this.advanceQueryFilters = filters;
  }//onNodeSelected

}
