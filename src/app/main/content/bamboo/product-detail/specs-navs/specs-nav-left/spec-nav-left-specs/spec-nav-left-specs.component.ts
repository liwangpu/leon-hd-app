import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductDetailService } from "../../../product-detail.service";
import { ObservableMedia } from '@angular/flex-layout';
import { fuseAnimations } from '../../../../../../../core/animations';
import { FuseMatSidenavHelperService } from '../../../../../../../core/directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.service';
import { Product } from "../../../../../../toolkit/models/product";
import { ProductSpec } from "../../../../../../toolkit/models/productspec";
import { Subject } from "rxjs";
import { ProductSpecService } from "../../../../../../toolkit/server/webapi/productSpec.service";
import { ProductService } from "../../../../../../toolkit/server/webapi/product.service";
import { DialogService } from '../../../../../../toolkit/common/services/dialog.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadComponent } from "../../../../../../toolkit/scene/product-spec/upload/upload.component";
import { SpecUploadComponent } from "../../../spec-upload/spec-upload.component";
import { PathService } from "../../../../../services/path.service";
@Component({
  selector: 'app-spec-nav-left-specs',
  templateUrl: './spec-nav-left-specs.component.html',
  styleUrls: ['./spec-nav-left-specs.component.scss'],
  animations: fuseAnimations
})
export class SpecNavLeftSpecsComponent implements OnInit, AfterViewInit, OnDestroy {
  chatSearch: any;
  searchText = '';
  product: Product;
  destroy$ = new Subject();
  productSpecs: Array<ProductSpec>;
  constructor(private detailService: ProductDetailService, public media: ObservableMedia, private productSpecSrv: ProductSpecService, private productSrv: ProductService, private dialog: MatDialog, private pathSrv: PathService) {
    this.chatSearch = {
      name: ''
    };

    this.product = this.detailService.product;
  }

  ngOnInit() {
    this.productSrv.getById(this.product.id).subscribe(rdata => {
      console.log(111, 'specs ', rdata);
      this.productSpecs = rdata.specifications;
    });
    // this.p
    // this.detailService.onChatsUpdated.subscribe(updatedChats => {
    //   this.chats = updatedChats;
    // });

    // this.detailService.onUserUpdated.subscribe(updatedUser => {
    //   this.user = updatedUser;
    // });

    // console.log(111,'SpecNavLeftSpecsComponent');

    // this.detailService.AfterProductChange.subscribe(data => {
    //   console.log(111, 'ggg', data);
    //   this.product = data;
    // });
    // setTimeout(() => {
    //   this.detailService.AfterProductChange.subscribe(data => {
    //     console.log(111, 'ggg', data);
    //     this.product = data;
    //   });
    // }, 300);
  }//ngOnInit

  ngAfterViewInit(): void {

  }//ngAfterViewInit

  ngOnDestroy(): void {
    //  console.log(111,'SpecNavLeftSpecsComponent destroy');
  }


  onEditProduct() {
    this.detailService.onLeftSidenavViewChanged.next('product');
  }

  onEditProductSpec(spec?: ProductSpec) {
    if (!spec)
      spec = new ProductSpec();
    spec.productId = this.detailService.product.id;
    this.detailService.currentEditSpec = spec;
    this.detailService.onLeftSidenavViewChanged.next('spec');
  }//onEditProductSpec

  onUploadFiles(spec: ProductSpec) {
    // let dialog = this.dialog.stepperUploader('上传产品规格附件', 3);
    let title = "上传产品规格信息";
    let stepName = ['上传模型', '上传材质', '上传Icon', '上传图片'];
    this.dialog.open(SpecUploadComponent, {
      width: '500px',
      height: '600px',
      data: { productSpecId: spec.id }
    });
  }

  onEditProductSpecPics(specId: string) {
    this.productSpecSrv.getById(specId).subscribe(resSpec => {
      this.detailService.onProductSpecSelected.next(resSpec);
    });
  }

}
