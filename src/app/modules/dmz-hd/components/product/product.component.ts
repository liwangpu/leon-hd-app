import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from '@geek/apps-base';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';
import { ICommonTableColumndef, IListViewAdvanceMenu } from '@geek/scaffold-page-plate';
import { ProductService, Product } from '@geek/micro-dmz-hd';
import { AsyncHandleService, DialogFactoryService } from '@geek/scaffold-app-minor';
import { IQueryFilter, QueryOperateEnum } from '@geek/micro-base';
import { ProductDetailCategoryFormComponent } from '../product-detail/product-detail-category-form/product-detail-category-form.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Product';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , {
      id: 'categoryId', name: 'glossary.Category', width: 150, cell: (data: Product) => {
        return data.categoryName;
      }
    }
    , {
      id: 'purchasePrice', name: 'glossary.PurchasePrice', width: 85, cell: (data: Product) => {
        return data.purchasePrice ? data.purchasePrice + '' : '0';
      }
    }
    , {
      id: 'partnerPrice', name: 'glossary.PartnerPrice', width: 85, cell: (data: Product) => {
        return data.partnerPrice ? data.partnerPrice + '' : '0';
      }
    }
    , {
      id: 'price', name: 'glossary.RetailPrice', width: 85, cell: (data: Product) => {
        return data.price ? data.price + '' : '0';
      }
    }
    , {
      id: 'unit', name: 'glossary.Unit', width: 80, cell: (data: Product) => {
        return data.unit;
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
      let dialogRef = this.dialogSrv.open(ProductDetailCategoryFormComponent, {
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
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: ProductService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe, protected dialogSrv: DialogFactoryService) {
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
