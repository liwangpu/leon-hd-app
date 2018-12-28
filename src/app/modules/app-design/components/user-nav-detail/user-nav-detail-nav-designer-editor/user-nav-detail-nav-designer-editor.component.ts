import { Component, OnInit } from '@angular/core';
import { DialogFactoryService, AsyncHandleService } from '@geek/scaffold-app-minor';
import { UserNavDetailNavDesignFormComponent } from '../user-nav-detail-nav-design-form/user-nav-detail-nav-design-form.component';
import { DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { Navigation, UserNav, UserNavService } from '@geek/micro-app-basic';

@Component({
  selector: 'app-user-nav-detail-nav-designer-editor',
  templateUrl: './user-nav-detail-nav-designer-editor.component.html',
  styleUrls: ['./user-nav-detail-nav-designer-editor.component.scss']
})
export class UserNavDetailNavDesignerEditorComponent implements OnInit {

  userNavId: string;
  userNavDetails: Array<Navigation> = [];
  constructor(protected interactSrv: DetailEditorInteractService, protected dialogSrv: DialogFactoryService, protected userNavSrv: UserNavService, protected asyncHandleSrv: AsyncHandleService) { }

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe((data: UserNav) => {
      if (!data) return;
      this.userNavId = data.id;
      this.userNavDetails = data.userNavDetails;
    });
  }//ngOnInit

  onEditNav(nodeTypes: string, parentId?: string, id?: string) {
    let refNavDetail = id ? this.userNavDetails.filter(x => x.id == id)[0] : {};

    let dialogRef = this.dialogSrv.open(UserNavDetailNavDesignFormComponent, {
      width: '600px',
      height: '480px',
      disableClose: true,
      data: {
        userNavId: this.userNavId
        , allowNoeTypes: nodeTypes ? nodeTypes : 'area,group,link'
        , parentId: parentId
        , id: id
        , refNavigationId: refNavDetail['refNavigationId']
        , excludeFiled: refNavDetail['excludeFiled']
        , excludePermission: refNavDetail['excludePermission']
        , excludeQueryParams: refNavDetail['excludeQueryParams']
      }
    });
    dialogRef.componentInstance.afterUserNavChange$.subscribe((datas: Array<Navigation>) => {
      this.userNavDetails = datas;
      dialogRef.close();
    });
  }//onAddNav


  onDeleteNav(id: string) {
    let source$ = this.userNavSrv.deleteUserNavDetail({
      userNavId: this.userNavId,
      id: id
    });
    this.asyncHandleSrv.asyncRequest(source$).subscribe(res => {
      this.userNavDetails = res.userNavDetails;
    });
  }//onDeleteNav

}
