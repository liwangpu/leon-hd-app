import { OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil, switchMap } from "rxjs/operators";
import { Subject, BehaviorSubject } from "rxjs";
import { ListPageRecovery } from "./v1-list-view-page-base";
import { IV1DetailEditorApiServer } from "../interfaces/i-v1-detail-editor-api-server";
import { Entity } from "micro-base";
import { DetailEditorInteractService } from "scaffold-page-plate";
import { AsyncHandleService } from "scaffold-app-minor";
import { Navigation } from "micro-app-basic";

export class V1DetailEditorPageBase implements OnInit, OnDestroy {

    protected _previousUrl: string;
    _showIcon = true;
    _showSave = true;
    _persisted = false;//数据已经持久化
    hideGoBack = false;
    listPageRecovery: ListPageRecovery;
    title: string;
    name: string;
    avatar: string;
    resource: string;
    entityData: Entity;
    permissionPoints: Array<string> = [];
    destroy$ = new Subject<boolean>();
    iconChange$ = new BehaviorSubject<string>(null);
    constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: IV1DetailEditorApiServer, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {

    }//constructor

    ngOnInit() {
        //从nav中获取页面标题等基础信息
        this.actr.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
            let navs: Array<Navigation> = data.navigations;
            if (this.resource && navs && navs.length > 0) {
                let refNav = navs.filter(x => x.resource ? (x.resource.toLocaleLowerCase() == this.resource.toLocaleLowerCase()) : false)[0];
                if (!refNav) {
                    this.router.navigate(['/']);
                    return;
                }
                this.title = refNav.title;
                let navUrls = refNav.url ? refNav.url.split(",") : [];
                this.permissionPoints = refNav.permission ? refNav.permission.split(",") : [];
                this._showIcon = refNav.field.indexOf('icon') > -1;
                this._showSave = refNav.field.indexOf('update') > -1;
                if (!this._showIcon)
                    this.avatar = undefined;
                if (navUrls.length > 0)
                    this._previousUrl = navUrls[0];
            }
        });//subscribe

        //获取页面查询参数,以便恢复或者刷新页面
        this.actr.queryParams.pipe(takeUntil(this.destroy$)).subscribe((rec: ListPageRecovery) => {
            this.listPageRecovery = rec;
        });//subscribe

        //获取实体信息
        this.actr.params.pipe(takeUntil(this.destroy$)).pipe(switchMap(param => {
            return this.apiSrv.getById(param["id"]);
        })).subscribe(data => {
            this._persisted = data && data.id ? true : false;
            this.interactSrv.afterDataRefresh$.next(data);
        });
        //订阅数据刷新后事件
        this.interactSrv.afterDataRefresh$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this._persisted = data && data.id ? true : false;
            if (!data) return;
            this.name = data.name;
            if (this._showIcon)
                this.avatar = data.icon;
        });
    }//ngOnInit

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.iconChange$.complete();
        this.iconChange$.unsubscribe();
    }//ngOnDestroy

    onGoBack() {
        if (!this._previousUrl) return;
        this.router.navigate([this._previousUrl], { queryParams: this.listPageRecovery });
    }//goback

    onCommitChange(data: any) {
        let odata = this.interactSrv.afterDataRefresh$.getValue();
        let ndata = { ...odata, ...data };
        this.asyncHandleSrv.asyncRequest(this.apiSrv.update(ndata), false, this.manualHandleError).subscribe(res => {
            this.interactSrv.afterDataRefresh$.next(res);
        });
    }//onCommitChange

    onCommitIconChange(data: { id: string, assetsId: string, iconUrl: string }) {
        this.asyncHandleSrv.asyncRequest(this.apiSrv.changeIcon({ objId: data.id, assetId: data.assetsId })).subscribe(() => {
            this.avatar = data.iconUrl;
            this.iconChange$.next(this.avatar);
            //目前更新了icon不需要更新整个data,暂时没有必要
            // let odata = this.interactSrv.afterDataRefresh$.getValue();
            // let ndata = { ...odata, ...data };
            // ndata["icon"] = data.iconUrl;
            // this.interactSrv.afterDataRefresh$.next(ndata);
        });
    }//onCommitIconChange

    manualHandleError(data: any): string {
        if (data.error && data.error.errors && data.error.errors.length > 0) {
            let msg = '';
            for (let item of data.error.errors) {
                msg += item.message + '  ';
            }
            return msg;
        }
        return '基类的错误信息';
    }
}
