import { Component, OnInit } from '@angular/core';
import { ProductPaginatorLaunchService } from './product-paginator-launch.service';
import { ProductLeftCategoryLaunchService } from './product-left-category-launch.service';
import { AccountService } from '../../share/services/webapis/account.service';
import { AccountTypeEnums } from '../../share/enums/enums';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [
    ProductPaginatorLaunchService, ProductLeftCategoryLaunchService
  ]
})
export class ProductComponent implements OnInit {

  constructor(public launch: ProductPaginatorLaunchService, public leftCategoyMdSrv: ProductLeftCategoryLaunchService, protected accountSrv: AccountService) { }

  ngOnInit() {
    //订阅个人信息变更事件
    this.accountSrv.profile$.subscribe(profile => {

      if (profile.role == AccountTypeEnums.brandAdmin || profile.role == AccountTypeEnums.brandMember) {
        this.launch.showHideColumn$.next(['purchasePrice', 'partnerPrice']);
      }
      else if (profile.role == AccountTypeEnums.partnerAdmin || profile.role == AccountTypeEnums.partnerMember) {
        this.launch.showHideColumn$.next(['partnerPrice']);
      }
      else { }
    });
  }//ngOnInit

}
