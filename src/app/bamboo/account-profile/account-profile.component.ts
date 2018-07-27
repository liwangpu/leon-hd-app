import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../share/services/webapis/account.service';
import { Subject } from '../../../../node_modules/rxjs';
import { takeUntil, skip } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit, OnDestroy {


  accountId: string;
  destroy$ = new Subject<boolean>();
  constructor(public apiSrv: AccountService) { }

  ngOnInit() {
    this.apiSrv.profile$.pipe(takeUntil(this.destroy$)).subscribe(profile => {
      this.accountId = profile.id;
    });
    //订阅用户信息变更事件
    this.apiSrv.editData$.pipe(takeUntil(this.destroy$)).pipe(skip(2)).subscribe(data => {
      let acc = this.apiSrv.editData$.getValue();
      let profile = this.apiSrv.profile$.getValue();
      profile.avatar = acc.icon;
      profile.name = acc.name;
      this.apiSrv.profile$.next(profile);
    });

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  afterAvatarChange(url: string) {
    let profile = this.apiSrv.profile$.getValue();
    profile.avatar = url;
    this.apiSrv.profile$.next(profile);
  }//afterAvatarChange

}
