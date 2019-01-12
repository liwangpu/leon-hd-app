import { OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil, tap } from "rxjs/operators";
import { Navigation } from "micro-app-basic";
import { Subject } from "rxjs";
import { AssetCategory } from "micro-dmz-hd";
import { IV1CategoryApiServer } from "../interfaces/i-v1-category-api-server";

export class V1CategoryEditorBase implements OnInit, OnDestroy {

    title: string;
    icon: string;
    resource: string;
    categories: Array<AssetCategory>;
    destroy$ = new Subject<boolean>();
    constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: IV1CategoryApiServer) {

    }//constructor

    ngOnInit(): void {
        let dataParam$ = this.actr.data.pipe(takeUntil(this.destroy$)).pipe(tap(data => {
            let navs: Array<Navigation> = data.navigations;
            if (this.resource && navs && navs.length > 0) {
                let refNav = navs.filter(x => x.resource ? (x.resource.toLocaleLowerCase() == this.resource.toLocaleLowerCase()) : false)[0];
                if (!refNav) {
                    this.router.navigate(['/']);
                    return;
                }
                this.title = refNav.title;
                this.icon = refNav.icon;
                // this.navUrls = refNav.url ? refNav.url.split(",") : [];
                // console.log('nav:', refNav);
            }
        }));//$

        dataParam$.subscribe();
    }//ngOnInit

    ngOnDestroy(): void {

    }//ngOnDestroy

}
