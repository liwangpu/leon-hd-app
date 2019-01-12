import { MatDialogConfig } from "@angular/material";

export interface IDialogOption extends MatDialogConfig<any> {
    data?: any;
    // [propName: string]: any;
}
