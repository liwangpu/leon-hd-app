import { Subject } from "rxjs";
import { OnInit, OnDestroy } from "@angular/core";
import { IConfirmDialogComponentBase } from "../interfaces/i-confirm-dialog-component-base";
import { IConfirmDialogComponentButton } from "../interfaces/i-confirm-dialog-component-button";

export class ConfirmDialogBase implements OnInit, OnDestroy, IConfirmDialogComponentBase {
    hideCancelButton = true;
    manageButtons: Array<IConfirmDialogComponentButton> = []
    doneAsync$: Subject<boolean> = new Subject();
    persistDialog$: Subject<boolean> = new Subject();
    disableButtons$: Subject<boolean> = new Subject();
    disableConfirmButton$: Subject<boolean> = new Subject();
    disableCancelButton$: Subject<boolean> = new Subject();
    closeDialog$: Subject<void> = new Subject();
    afterConfirm$: Subject<void> = new Subject();
    afterCancel$: Subject<void> = new Subject();
    satisfyConfirm$: Subject<boolean> = new Subject();
    destroy$: Subject<boolean> = new Subject();
    constructor() {

    }//constructor


    ngOnInit() {

    }//ngOnInit

    ngOnDestroy(): void {
        this.doneAsync$.complete();
        this.doneAsync$.unsubscribe();
        this.persistDialog$.complete();
        this.persistDialog$.unsubscribe();
        this.disableButtons$.complete();
        this.disableButtons$.unsubscribe();
        this.disableConfirmButton$.complete();
        this.disableConfirmButton$.unsubscribe();
        this.disableCancelButton$.complete();
        this.disableCancelButton$.unsubscribe();
        this.closeDialog$.complete();
        this.closeDialog$.unsubscribe();      
        this.afterConfirm$.complete();
        this.afterConfirm$.unsubscribe();
        this.afterCancel$.complete();
        this.afterCancel$.unsubscribe();
        this.satisfyConfirm$.complete();
        this.satisfyConfirm$.unsubscribe();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }//ngOnDestroy

}
