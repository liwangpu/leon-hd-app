import { Component, OnInit, Input } from '@angular/core';
import { ProductPackageService, ProductPackage } from 'micro-dmz-oms';

@Component({
  selector: 'app-product-package-manage',
  templateUrl: './product-package-manage.component.html',
  styleUrls: ['./product-package-manage.component.scss']
})
export class ProductPackageManageComponent implements OnInit {

  private _lastSpecId: string;
  private _packages: ProductPackage[];
  newPackage: any;
  set packages(val: ProductPackage[]) {
    val.sort((a, b) => b.num - a.num);
    this._packages = val;
  }
  get packages(): ProductPackage[] {
    return this._packages;
  }
  @Input() set productSpecId(id: string) {
    if (!id || id === this._lastSpecId) return;
    this.pckSrv.getBySpecId(id).subscribe(pcks => {
      this.packages = pcks;
    });

    this._lastSpecId = id;
  }
  constructor(protected pckSrv: ProductPackageService) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  addPackage() {
    this.newPackage = {};
  }//addPackage

  deletePackage(id?: string) {
    if (!id) {
      this.newPackage = undefined;
    }
    else {
      this.pckSrv.delete(id).subscribe(() => {
        let arr = this.packages.filter(x => x.id != id);
        this.packages = arr;
      });
    }
  }//deletePackage

  savePackage(pck: ProductPackage) {
    pck.productSpecId = this._lastSpecId;
    this.pckSrv.update(pck).subscribe(res => {
      this.newPackage = undefined;
      let arr = [...this.packages];
      if (!pck.id) {
        arr.push(res);
      }
      else {
        let idx = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
          let item = arr[i];
          if (item.id == pck.id) {
            idx = i;
            break;
          }
        }
        arr[idx] = pck;
      }
      this.packages = arr;
    });
  }//savePackage

}
