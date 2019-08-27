import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { AppProgressService, AppSearchService, Path } from 'scaffold-app-core';
import { ICommonTableColumndef, IListViewAdvanceMenu } from 'scaffold-page-plate';
import { ProductService, Product } from 'micro-dmz-hd';
import { AsyncHandleService, DialogFactoryService, SnackbarService } from 'scaffold-app-minor';
import { IQueryFilter, QueryOperateEnum, ConjunctFilter } from 'micro-base';
import { ProductDetailCategoryFormComponent } from '../product-detail/product-detail-category-form/product-detail-category-form.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver/FileSaver';

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
    , {
      id: 'brand', name: 'glossary.Brand', width: 150, cell: (data: Product) => {
        return data.brand;
      }
    }
    , {
      id: 'tpid', name: 'glossary.TPID', width: 150, cell: (data: Product) => {
        return data.tpid;
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
  _importTemplate: IListViewAdvanceMenu = {
    name: 'button.Import',
    icon: 'cloud_upload',
    needSelectedItem: false,
    permissionPoint: 'import_template',
    onClick: () => {
      this.fileCt.nativeElement.click();
    }
  };
  _exportTemplate: IListViewAdvanceMenu = {
    name: 'button.ExportTemplate',
    icon: 'cloud_download',
    needSelectedItem: false,
    permissionPoint: 'export_template',
    onClick: () => {
      this.httpClient.get(`${this.apiSrv.uri}/ProductAndCategoryImportTemplate?`, { responseType: 'blob' }).subscribe(fs => {
        saveAs(fs, 'Export Result.csv');
      });
    }
  };
  _exportAll: IListViewAdvanceMenu = {
    name: 'button.ExportAll',
    icon: 'cloud_download',
    needSelectedItem: false,
    permissionPoint: 'export_all',
    onClick: () => {

      let advanQueryArr: Array<IQueryFilter> = [
        {
          field: 'page',
          value: this.pageData.page,
          operate: QueryOperateEnum.equal
        },
        {
          field: 'pageSize',
          value: this.pageData.size,
          operate: QueryOperateEnum.equal
        }
      ];
      let queryPart = ConjunctFilter(advanQueryArr.concat(this._advanceQueryFilters));

      this.snackbarSrv.simpleTranslateBar('message.PleaseBePatientWhileProcessing');
      this.httpClient.get(`${this.apiSrv.uri}/Export?${queryPart}`, { responseType: 'blob' }).subscribe(fs => {
        saveAs(fs, 'Export Result.csv');
      });
    }
  };
  advanceMenus: Array<IListViewAdvanceMenu> = [
    this._changeCategoryAdvanceMenu,
    this._deleteAdvanceMenu,
    this._exportTemplate,
    this._importTemplate,
    this._exportAll
  ];
  @ViewChild('fileCt') fileCt: ElementRef;
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: ProductService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe, protected dialogSrv: DialogFactoryService, protected httpClient: HttpClient, protected snackbarSrv: SnackbarService) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr,dialogSrv);
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

  onFileChange(event: any) {
    let fileBrowser = this.fileCt.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      let file = fileBrowser.files[0];
      let header = new HttpHeaders({
        "fileExt": Path.getFileExtension(file.name)
      });
      formData.append("file", file);
      this.snackbarSrv.simpleTranslateBar('message.PleaseBePatientWhileProcessing');
      this.httpClient.put(`${this.apiSrv.uri}/ImportProductAndCategory`, formData, { headers: header, responseType: 'blob' }).subscribe(fs => {
        saveAs(fs, 'Import Result.csv');
      });
    }
  }//onFileChange

}
