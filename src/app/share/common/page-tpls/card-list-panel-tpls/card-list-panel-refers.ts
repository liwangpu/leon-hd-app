import { IListableService } from "../../../services/webapis/ilistableService";
import { EntityBase } from "../../../models/entitybase";
import { Subject } from "rxjs";

export abstract class CommonCardPanelBase {
    title: string;
    apiSrv: IListableService<EntityBase>;
    preItems: Array<ICommonCardPreItem> = [];
    buttons: Array<ICommonCardManageButton> = [];
    selectChange$ = new Subject<string>();
    abstract editData(data?: EntityBase): void;
    abstract deleteData(data: EntityBase): void;
}

export interface ICommonCardPreItem {
    id: string;
    icon?: string;
    name: string;
    defaultItem?: boolean;
}

export interface ICommonCardManageButton {
    icon: string;
    name: string;
    onClick: Function;
    needDataFirst?: boolean;
}