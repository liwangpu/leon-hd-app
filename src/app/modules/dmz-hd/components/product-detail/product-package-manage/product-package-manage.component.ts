import { Component, OnInit, Input } from '@angular/core';
import { ProductPackageService, ProductPackage } from 'micro-dmz-oms';

@Component({
  selector: 'app-product-package-manage',
  templateUrl: './product-package-manage.component.html',
  styleUrls: ['./product-package-manage.component.scss']
})
export class ProductPackageManageComponent implements OnInit {

  private _lastSpecId: string;
  newPackage: any;
  packages: ProductPackage[];
  @Input() set productSpecId(id: string) {
    if (!id || id === this._lastSpecId) return;
    this.pckSrv.getBySpecId(id).subscribe(pcks => {
      console.log('packages', pcks);
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

}
