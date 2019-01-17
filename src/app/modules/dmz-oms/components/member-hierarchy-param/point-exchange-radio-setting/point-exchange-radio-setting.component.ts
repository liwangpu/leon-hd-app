import { Component, OnInit } from '@angular/core';
import { MemberHierarchyParamService } from 'micro-dmz-oms';
import { AsyncHandleService } from 'scaffold-app-minor';

@Component({
  selector: 'app-point-exchange-radio-setting',
  templateUrl: './point-exchange-radio-setting.component.html',
  styleUrls: ['./point-exchange-radio-setting.component.scss']
})
export class PointExchangeRadioSettingComponent implements OnInit {

  rate: number;
  constructor(protected prmSrv: MemberHierarchyParamService, protected asyncHandleSrv: AsyncHandleService) {

  }//constructor

  ngOnInit() {
    this.prmSrv.getPointExchange().subscribe(rat => {
      this.rate = rat;
    });
  }//ngOnInit

  afterConfirm() {
    let source$ = this.prmSrv.updatePointExchange(this.rate);
    this.asyncHandleSrv.asyncRequest(source$).subscribe();
  }//afterConfirm
}
