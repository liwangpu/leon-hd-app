import { Injectable, OnDestroy } from '@angular/core';
import { Product } from "../../../toolkit/models/product";
import { ProductSpec } from "../../../toolkit/models/productspec";
import { Subject } from "rxjs/Subject";
@Injectable()
export class ProductDetailMdService implements OnDestroy {

  currentEditPointer: EditPointer = EditPointer.PoductDetail;
  product: Product;//当前编辑的产品信息
  productSpec: ProductSpec;//当前编辑的规格信息
  specifications: Array<ProductSpec> = [];//临时存储规格信息,用于页面初始化传递值,除此外不用到
  onEdit$: Subject<void> = new Subject();
  afterSaveProduct$: Subject<void> = new Subject();
  afterSaveProductSpec$: Subject<void> = new Subject();
  submitProduct$: Subject<void> = new Subject();
  submitProductSpec$: Subject<void> = new Subject();
  afterSelectProductSpec$: Subject<void> = new Subject();//选择规格事件
  afterProductCharletChange$: Subject<boolean> = new Subject();
  submitData$: Subject<EditPointer> = new Subject();//提交按钮事件
  destroy$: Subject<boolean> = new Subject();
  constructor() {
    this.submitData$.takeUntil(this.destroy$).subscribe(() => {
      if (this.currentEditPointer == EditPointer.PoductDetail)
        this.submitProduct$.next();
      else if (this.currentEditPointer == EditPointer.ProductSpec)
        this.submitProductSpec$.next();
      else { }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
export enum EditPointer {
  PoductDetail = 1,
  ProductSpec = 2
}
