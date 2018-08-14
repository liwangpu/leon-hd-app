import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { ObservableMedia } from '../../../../node_modules/@angular/flex-layout';
import { MatDrawer } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-nav-edit',
  templateUrl: './nav-edit.component.html',
  styleUrls: ['./nav-edit.component.scss']
})
export class NavEditComponent implements OnInit {

  titleName = 'nav.NavSetting';
  iconName = 'chrome_reader_mode'
  showDrawer = true;//drawer显示状态 true=>屉子现在为显示状态
  drawerOnSwitch = false;
  sideMode = 'side';
  watcher: Subscription;
  drawerDyStyle = {};
  @ViewChild('drawer', { read: MatDrawer }) drawer: MatDrawer;
  constructor(public media: ObservableMedia) {

  }//constructor

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
  }//ngOnInit

}
