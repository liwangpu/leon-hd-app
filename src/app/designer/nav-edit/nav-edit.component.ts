import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, Observable } from '../../../../node_modules/rxjs';
import { ObservableMedia } from '../../../../node_modules/@angular/flex-layout';
import { MatDrawer } from '../../../../node_modules/@angular/material';
import { UserRoleService } from '../../share/services/webapis/user-role.service';
import { UserRole } from '../../share/models/user-role';
import { TreeModel } from '../../../../node_modules/ng2-tree';

@Component({
  selector: 'app-nav-edit',
  templateUrl: './nav-edit.component.html',
  styleUrls: ['./nav-edit.component.scss']
})
export class NavEditComponent implements OnInit {
  public tree: TreeModel = {
    value: '用户角色',
    // children: [
    //   {
    //     value: 'Object-oriented programming',
    //     children: [{ value: 'Java' }, { value: 'C++' }, { value: 'C#' }]
    //   },
    //   {
    //     value: 'Prototype-based programming',
    //     children: [{ value: 'JavaScript' }, { value: 'CoffeeScript' }, { value: 'Lua' }]
    //   }
    // ]
  };



  titleName = 'nav.NavSetting';
  iconName = 'chrome_reader_mode'
  showDrawer = true;//drawer显示状态 true=>屉子现在为显示状态
  drawerOnSwitch = false;
  sideMode = 'side';
  watcher: Subscription;
  drawerDyStyle = {};
  // selectedRole = '';
  userRoles: Observable<Array<UserRole>>;
  @ViewChild('drawer', { read: MatDrawer }) drawer: MatDrawer;
  constructor(public media: ObservableMedia, public userRoleSrv: UserRoleService) {

  }//constructor

  /**
   * selectedRole
   */
  private _selectedRole: string;
  set selectedRole(vl: string) {
    this._selectedRole = vl;
    this.getRoleNav();
  }
  get selectedRole() {
    return this._selectedRole;
  }

  ngOnInit() {
    this.watcher = this.media.subscribe(() => {
      let largeScreen = this.media.isActive('gt-xs');

      //当屉子当前处于打开,但是屏幕改变为小屏幕,需要先隐藏屉子
      if (this.showDrawer && !largeScreen)
        this.drawer.close();
      this.drawerOnSwitch = false;
      this.showDrawer = largeScreen;

      if (largeScreen)
        this.sideMode = 'side';
      else
        this.sideMode = 'push';


      this.showDrawer = largeScreen;
      let drawerWidth = '75%';
      if (this.showDrawer) {
        this.drawer.open();
        drawerWidth = '50%'
      }
      this.drawerDyStyle = { width: drawerWidth };
    });

    // this.userRoleSrv.getRole().subscribe(res => {
    //   // console.log('user role', res);
    //   this.userRoles=
    // });
    this.userRoles = this.userRoleSrv.getRole();
  }//ngOnInit

  getRoleNav() {

  }//getRoleNav

}
