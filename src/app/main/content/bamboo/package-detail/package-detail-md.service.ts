import { Injectable } from '@angular/core';
import { Package } from "../../../toolkit/models/package";
import { PackageService } from "../../../toolkit/server/webapi/package.service";
import { Subject } from 'rxjs';
@Injectable()
export class PackageDetailMdService {

  currentPackage: Package;//当前操作的Package
  afterPackageChange$: Subject<void> = new Subject();//订单更新后触发事件
  destroy$: Subject<boolean> = new Subject();
  constructor() {

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
