import { Subject, BehaviorSubject } from "rxjs";
import { Ilistable } from "../../../models/ilistable";
import { ListableBase } from "../../../models/listablebase";

/**
 * 基础信息扩展视图基类
 */
export abstract class BasicInfoTabExtend {
    private _canSave = false;
    satisfySave$ = new Subject<boolean>();
    afterDataChange$ = new BehaviorSubject<any>({});
    destroy$: Subject<boolean> = new Subject();
    data: any;
    manageButtons: Array<BasicInfoTabExtendManageButton> = [];
    set canSave(vl: boolean) {
        this._canSave = vl;
        this.satisfySave$.next(vl);
    }
    get canSave() {
        return this._canSave;
    }

}

export abstract class DetailTabBaseExtend {
    isBasic: boolean;
    dataChange$: BehaviorSubject<Ilistable> = new BehaviorSubject(new ListableBase());
  }
  

export interface BasicInfoTabExtendManageButton {
    name: string;
    icon: string;
    click: (data: Ilistable) => void;
    needPersistent?: boolean;
}

export abstract class CustomTabBaseExtend {
    isBasic: boolean;
    dataChange$: BehaviorSubject<Ilistable> = new BehaviorSubject(new ListableBase());
    destroy$: Subject<boolean> = new Subject();
}