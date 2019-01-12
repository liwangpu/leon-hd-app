import { IDialogOption } from "./i-dialog-option";

export interface ISimpleConfirmDialogOption extends IDialogOption {
    hideCancelBtn?: boolean;
}
