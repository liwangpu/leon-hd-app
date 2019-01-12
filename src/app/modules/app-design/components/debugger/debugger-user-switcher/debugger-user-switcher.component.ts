import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LocalStoreService, AppCacheService } from 'scaffold-app-core';
import { AsyncHandleService } from 'scaffold-app-minor';
import { TokenService, AccountService } from 'micro-app-basic';
import { tap } from 'rxjs/operators';
import { concat } from 'rxjs';
const LatestUser_Store = 'dmz_debugger_latest_users';
@Component({
  selector: 'app-debugger-user-switcher',
  templateUrl: './debugger-user-switcher.component.html',
  styleUrls: ['./debugger-user-switcher.component.scss']
})
export class DebuggerUserSwitcherComponent implements OnInit, OnDestroy {


  showLoginPanel = false;
  logingForm: FormGroup;
  latestUsers: Array<LatestUser> = [];
  constructor(protected formBuilder: FormBuilder, protected storeSrv: LocalStoreService, protected asyncHandle: AsyncHandleService, protected tokenSrv: TokenService, protected profileSrv: AccountService, protected appCacheSrv: AppCacheService) {
    this.logingForm = this.formBuilder.group({
      id: ['']
      , flag: ['']
      , username: ['', [Validators.required]]
      , password: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    let userStr = this.storeSrv.getItem(LatestUser_Store);
    this.latestUsers = JSON.parse(userStr);
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  reStoreLatesUser() {
    //admin用户提前
    let existAdmin = this.latestUsers.some(x => x.username == 'admin');
    if (existAdmin) {
      let adminUser = this.latestUsers.filter(x => x.username == 'admin')[0];
      let noAdminUsers = this.latestUsers.filter(x => x.username != 'admin');
      noAdminUsers.unshift(adminUser);
      this.latestUsers = noAdminUsers;
    }
    this.storeSrv.setItem(LatestUser_Store, JSON.stringify(this.latestUsers));
  }//refreshLatesUserStore

  toggleLoginPanel() {
    this.showLoginPanel = !this.showLoginPanel;
    if (!this.showLoginPanel)
      this.logingForm.reset();
  }//toggleLoginPanel

  addUser() {
    this.showLoginPanel = true;
  }//addUser

  saveUser() {
    let user = this.logingForm.value;
    if (!user.id) {
      user.id = moment(new Date()).format('x');
      this.latestUsers.push(user);
    }
    else {
      for (let idx = this.latestUsers.length - 1; idx >= 0; idx--) {
        let citem = this.latestUsers[idx];
        if (citem.id == user.id) {
          citem.username = user.username;
          citem.password = user.password;
          citem.flag = user.flag;
          break;
        }
      }
    }
    this.reStoreLatesUser();
    this.showLoginPanel = false;
    this.logingForm.reset();
  }//saveUser

  editUser(id: string) {
    let user = this.latestUsers.filter(x => x.id == id)[0];
    this.logingForm.patchValue(user);
    this.showLoginPanel = true;
  }//editUser

  toggleUser(id: string) {
    let user = this.latestUsers.filter(x => x.id == id)[0];
    let token$ = this.tokenSrv.requestToken(user.username, user.password).pipe(tap(res => {
      this.appCacheSrv.token = res.token;
      this.appCacheSrv.tokenExpires = res.expires;
      let lastLoginAccount = { username: user.username, password: user.password };
      this.appCacheSrv.lastLoginAccount = JSON.stringify(lastLoginAccount);
    }));

    let profile$ = this.profileSrv.requestProfile().pipe(tap(profile => {
      this.appCacheSrv.nickName = profile.name;
      this.appCacheSrv.userId = profile.id;
      this.appCacheSrv.organId = profile.organizationId;
      this.appCacheSrv.icon = profile.icon;
      this.appCacheSrv.role = profile.roleId;

      console.log('当前用户个人信息:', profile);
    }));
    this.asyncHandle.asyncRequest(concat(token$, profile$)).subscribe();
  }//toggleUser

  deleteUser(id: string) {
    this.latestUsers = this.latestUsers.filter(x => x.id != id);
    this.reStoreLatesUser();
  }//deleteUser

  clearLatestUser() {
    this.latestUsers = [];
    this.reStoreLatesUser();
  }//clearLatestUser

}

class LatestUser {
  id: string;
  username: string;
  password: string;
  flag: string;
}
