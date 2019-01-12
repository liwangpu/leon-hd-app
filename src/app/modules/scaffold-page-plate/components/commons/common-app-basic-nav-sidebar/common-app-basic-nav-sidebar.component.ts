import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'page-plate-app-basic-nav-sidebar',
  templateUrl: './common-app-basic-nav-sidebar.component.html',
  styleUrls: ['./common-app-basic-nav-sidebar.component.scss']
})
export class CommonAppBasicNavSidebarComponent implements OnInit {

  @Input() showProgress = false;
  @Input() maximize = false;
  @Input() showSideScreens = ['md', 'lg', 'xl']
  @Input() navBarRef: ElementRef<any>;
  @Input() toolBarRef: ElementRef<any>;
  @Input() contentRef: ElementRef<any>;
  @ViewChild('drawer') drawerIns: MatDrawer;
  constructor(protected media: ObservableMedia) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  changeDrawerMode(mode: string) {
    this.drawerIns.mode = mode as any;
  }//changeDrawerMode

  openDrawer() {
    this.drawerIns.open();
  }//openDrawer

  closeDrawer() {
    this.drawerIns.close();
  }//openDrawer

  toggleDrawer() {
    this.drawerIns.toggle();
  }//openDrawer

}
