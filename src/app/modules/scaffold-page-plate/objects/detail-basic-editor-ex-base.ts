import { OnInit, OnDestroy } from "@angular/core";
import { Subject, ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { DetailEditorInteractService } from "../services/detail-editor-interact.service";

export class DetailBasicEditorExBase implements OnInit, OnDestroy {

    detailForm: FormGroup;
    dataRefershSubject$ = new ReplaySubject<any>(1);//使用内部的事件,因为考虑到可能ex需要对data实体信息进行转换
    destroy$ = new Subject<boolean>();
    constructor(protected interactSrv: DetailEditorInteractService) {
    }//constructor

    ngOnInit(): void {
        this.interactSrv.afterDataRefresh$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            if (data) {
                this.dataRefershSubject$.next(data);
            }
        });//subscribe

        this.detailForm.valueChanges.subscribe(data => {
            this.interactSrv.satisfyCommit$.next(this.detailForm.valid);
            this.interactSrv.basicExDataChange$.next(data);
        });//subscribe
    }//ngOnInit

    ngOnDestroy(): void {
        this.dataRefershSubject$.complete();
        this.dataRefershSubject$.unsubscribe();
        this.destroy$.next(true);
        this.destroy$.complete();
        this.destroy$.unsubscribe();
    }//ngOnDestroy

}
