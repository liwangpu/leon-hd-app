import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription, Observable } from '../../../../node_modules/rxjs';
import { ObservableMedia } from '../../../../node_modules/@angular/flex-layout';
import { MatDrawer } from '../../../../node_modules/@angular/material';
import { UserRoleService } from '../../share/services/webapis/user-role.service';
import { UserRole } from '../../share/models/user-role';
import { TreeModel, NodeMenuItemAction, MenuItemSelectedEvent, NodeSelectedEvent } from '../../../../node_modules/ng2-tree';
import { UUID } from 'angular2-uuid';
import { SnackbarService } from '../../share/services/common/snackbar.service';
import { OEditBaseComponent } from './o-edit-base/o-edit-base.component';
import { NavService } from '../../share/services/webapis/nav.service';

@Component({
  selector: 'app-nav-edit',
  templateUrl: './nav-edit.component.html',
  styleUrls: ['./nav-edit.component.scss']
})
export class NavEditComponent implements OnInit, AfterViewInit {

  basicSetting = {};
  //根节点设置
  rootNodeSettings = {
    ...this.basicSetting,
    menuItems: [
      { action: NodeMenuItemAction.Custom, name: 'Add Area' }
    ]
  };
  //区域节点设置
  areaNodeSettings = {
    ...this.basicSetting,
    menuItems: [
      { action: NodeMenuItemAction.Custom, name: 'Add Link Group' },
      { action: NodeMenuItemAction.Custom, name: 'Add Link' }
    ]
  };
  //链接组节点设置
  groupLinkSettings = {
    ...this.basicSetting,
    menuItems: [
      { action: NodeMenuItemAction.Custom, name: 'Add Link' }
    ]
  };
  //链接节点设置
  linkSettings = {
    ...this.basicSetting,
    rightMenu: false,
    menuItems: []
  };

  /**
   * 由于TreeModel没有存储额外字段的方式,所以将导航栏节点信息保存在id里面,用||分隔
   * 而TreeModel的value用来存储节点的描述,中文就好了,因为她不需要显示在导航栏
   * id格式如下:
   * 节点类型代号(第一位)@UUID||name translate Key||icon||url||permission
   * 节点类型如下:
   * 0 根节点
   * 1 区域
   * 2 链接组
   * 3 链接
   */
  tree: TreeModel = {
    id: '0@',
    value: 'Navigation',
    children: [],
    settings: this.rootNodeSettings
  };


  titleName = 'nav.NavSetting';
  iconName = 'chrome_reader_mode'
  showDrawer = true;//drawer显示状态 true=>屉子现在为显示状态
  drawerOnSwitch = false;
  sideMode = 'side';
  watcher: Subscription;
  drawerDyStyle = {};

  currentEditNodeType = '0';
  userRoles: Observable<Array<UserRole>>;
  @ViewChild('drawer', { read: MatDrawer }) drawer: MatDrawer;
  @ViewChild('treeComponent') treeComponent: any;
  @ViewChild('areaNodeFrm') areaNodeFrm: OEditBaseComponent;
  @ViewChild('groupLinkNodeFrm') groupLinkNodeFrm: OEditBaseComponent;
  @ViewChild('linkNodeFrm') linkNodeFrm: OEditBaseComponent;

  constructor(public media: ObservableMedia, public userRoleSrv: UserRoleService, public snackBarSrv: SnackbarService, public navSrv: NavService) {

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

    this.userRoles = this.userRoleSrv.getRole();
  }//ngOnInit

  ngAfterViewInit(): void {
    this.areaNodeFrm.afterSave.subscribe(data => this.afterNodeSave(data));
    this.groupLinkNodeFrm.afterSave.subscribe(data => this.afterNodeSave(data));
    this.linkNodeFrm.afterSave.subscribe(data => this.afterNodeSave(data));
  }//ngAfterViewInit

  getRoleNav() {
    this.navSrv.getByRole(this._selectedRole).subscribe((data: { children: Array<any>, id: string }) => {
      const currentNodeCt = this.treeComponent.getControllerByNodeId('0@');
      currentNodeCt.setChildren([]);
      if (data && data.children) {
        for (let item of data.children) {
          console.log('aa', item);
          currentNodeCt.addChild(item);
        }
      }
      // // currentNodeCt.collapse();
      // currentNodeCt.setChildren(data && data.children ? data.children : []);
      // // currentNodeCt.select();
      // setTimeout(() => {
      //   currentNodeCt.reloadChildren();
      // }, 3000);
      // // currentNodeCt.reloadChildren();
      // // currentNodeCt.expand();
      // // this.tree = data as TreeModel;

    });
  }//getRoleNav

  onNodeItemSelected(evt: NodeSelectedEvent) {
    this.currentEditNodeType = evt.node.id.toString().substring(0, 1);
    if (this.currentEditNodeType == '0')
      return;


    let data = {
      parentId: evt.node.parent.id.toString(),
      id: evt.node.id.toString(),
      value: evt.node.value
    };

    if (this.currentEditNodeType == '1')
      this.areaNodeFrm.refreshData(data);
    else if (this.currentEditNodeType == '2')
      this.groupLinkNodeFrm.refreshData(data);
    else
      this.linkNodeFrm.refreshData(data);
  }//onNodeItemSelected

  onMenuItemSelected(vl: MenuItemSelectedEvent) {
    this.currentEditNodeType = vl.node.id.toString().substring(0, 1);

    //根节点右键菜单响应
    if (this.currentEditNodeType === '0') {
      if (vl.selectedItem == 'Add Area') {
        this.currentEditNodeType = '1';
        let gid = `1@${UUID.UUID()}|| || || || `;
        let data = {
          parentId: vl.node.id.toString(),
          id: gid,
          value: ''
        };
        this.areaNodeFrm.refreshData(data);
      }
    }

    //区域节点右键菜单响应
    else if (this.currentEditNodeType === '1') {
      if (vl.selectedItem == 'Add Link Group') {
        this.currentEditNodeType = '2';
        let gid = `2@${UUID.UUID()}|| || || || `;
        let data = {
          parentId: vl.node.id.toString(),
          id: gid,
          value: ''
        };
        this.groupLinkNodeFrm.refreshData(data);
      }
      else if (vl.selectedItem == 'Add Link') {
        this.currentEditNodeType = '3';
        let gid = `3@${UUID.UUID()}|| || || || `;
        let data = {
          parentId: vl.node.id.toString(),
          id: gid,
          value: ''
        };
        this.linkNodeFrm.refreshData(data);
      }
      else;
    }

    //链接组节点右键菜单响应
    else if (this.currentEditNodeType === '2') {
      if (vl.selectedItem == 'Add Link') {
        this.currentEditNodeType = '3';
        let gid = `3@${UUID.UUID()}|| || || || `;
        let data = {
          parentId: vl.node.id.toString(),
          id: gid,
          value: ''
        };
        this.linkNodeFrm.refreshData(data);
      }
      else;
    }

    //链接节点响应右键菜单响应
    else;
  }//onMenuItemSelected

  afterNodeSave(data: { parentId: string, id: string, oldId: string, value: string }) {
    let node = {
      id: data.id,
      value: data.value
    };
    const currentNodeCt = this.treeComponent.getControllerByNodeId(data.oldId)
    if (!currentNodeCt) {
      const parentNodeCt = this.treeComponent.getControllerByNodeId(data.parentId);

      let nodetype = data.id.toString().substring(0, 1);
      if (nodetype == '1') {
        node['children'] = [];
        node['settings'] = this.areaNodeSettings;
      }
      else if (nodetype == '2') {
        node['children'] = [];
        node['settings'] = this.groupLinkSettings;
      }
      else if (nodetype == '3')
        node['settings'] = this.linkSettings;
      else;
      parentNodeCt.addChild(node);
    }
    else {
      if (data.id != data.oldId)
        currentNodeCt.changeNodeId(node.id);
      currentNodeCt.rename(node.value);
    }

    this.submitNavs();
  }//afterNodeSave

  onUpdateTreeData(tree: any) {
    // tree.treeModel.expandAll();
  }

  submitNavs() {
    let ct = this.treeComponent.getControllerByNodeId('0@')
    let navs = ct.toTreeModel();
    // let model = {

    // };
    this.navSrv.update(this._selectedRole, JSON.stringify(navs)).subscribe();
    // console.log('navs', JSON.stringify(navs));
  }//submitNavs

  test() {
    let ct = this.treeComponent.getControllerByNodeId('0@')
    let model = ct.toTreeModel();
    console.log('tree', JSON.stringify(model));
  }



}
