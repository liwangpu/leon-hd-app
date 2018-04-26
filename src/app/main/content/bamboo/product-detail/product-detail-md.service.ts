import { Injectable } from '@angular/core';
import { Product } from "../../../toolkit/models/product";
import { Subject } from "rxjs/Subject";
@Injectable()
export class ProductDetailMdService {


  product: Product;//当前编辑的产品信息
  onEdit$: Subject<void> = new Subject();
  afterSaveProduct$: Subject<void> = new Subject();
  submitProduct$: Subject<void> = new Subject();
  constructor() {

  }



}
