import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { NavService, Navigation, NavNodeTypeEnum, UserNavService, UserNav } from '@geek/micro-app-basic';
import { IQueryFilter, QueryOperateEnum } from '@geek/micro-base';

@Component({
  selector: 'app-user-nav-detail-nav-design-form',
  templateUrl: './user-nav-detail-nav-design-form.component.html',
  styleUrls: ['./user-nav-detail-nav-design-form.component.scss']
})
export class UserNavDetailNavDesignFormComponent implements OnInit {

  MatApiAutoSelectComponent;
  showOverridePanel = false;
  defaultNavId: string;
  defaultNavName: string;
  navAdvanceFilters: Array<IQueryFilter>;
  enableConfirm = false;
  detailForm: FormGroup;
  originFieldControl = new FormControl();
  originPermissionControl = new FormControl();
  originQueryParamsControl = new FormControl();
  afterUserNavChange$ = new EventEmitter<Array<Navigation>>();
  destroy$ = new Subject<boolean>();
  constructor(protected formBuilder: FormBuilder, protected asyncHandleSrv: AsyncHandleService, public apiSrv: NavService, protected userNavSrv: UserNavService) {
    this.detailForm = this.formBuilder.group({
      id: []
      , userNavId: ['']
      , parentId: ['']
      , grade: ['']
      , refNavigationId: ['', [Validators.required]]
      , excludeFiled: ['']
      , excludePermission: [""]
      , excludeQueryParams: [""]
    });
    this.originFieldControl = new FormControl({ value: '', disabled: true }, []);
    this.originPermissionControl = new FormControl({ value: '', disabled: true }, []);
    this.originQueryParamsControl = new FormControl({ value: '', disabled: true }, []);
  }

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(() => {
      this.enableConfirm = this.detailForm.valid;
    });
  }//ngOnInit

  onNavSelected(item: Navigation) {
    if (item.nodeType == NavNodeTypeEnum.Link) {
      this.showOverridePanel = true;
      this.originFieldControl.patchValue(item.field);
      this.originPermissionControl.patchValue(item.permission);
      this.originQueryParamsControl.patchValue(item.queryParams);
    }
    this.detailForm.patchValue({ refNavigationId: item.id });
  }//onNavSelected

  afterReceiveData(data: { allowNoeTypes: string, userNavId: string, refNavigationId: string, id?: string, parentId?: string, excludeFiled?: string, excludePermission?: string, excludeQueryParams: string, grade?: number }) {

    this.navAdvanceFilters = [
      {
        field: 'nodeTypes',
        value: data.allowNoeTypes,
        operate: QueryOperateEnum.equal
      }
    ];
    this.defaultNavId = data.refNavigationId;
    this.detailForm.patchValue({ userNavId: data.userNavId, id: data.id, parentId: data.parentId, excludeFiled: data.excludeFiled, excludePermission: data.excludePermission, excludeQueryParams: data.excludeQueryParams, grade: data.grade });
  }//afterReceiveData

  afterConfirm() {
    let data = this.detailForm.value;
    let source$ = this.userNavSrv.updateUserNavDetail(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe((res: UserNav) => {
      this.afterUserNavChange$.next(res.userNavDetails);
    });
  }//afterConfirm

}
