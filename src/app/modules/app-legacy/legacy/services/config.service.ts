import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {

    get serverBase() {
        return environment.serveBase;
    }

    // get isMaintaining() {
    //     return environment.isMaintaining;
    // }

    // get maintainingEndDate() {
    //     return environment.maintainingEndDate;
    // }

    // get language() {
    //     return environment.language;
    // }
    get dialog_min(): { width: string, height: string } {
        return environment.dialogMin;
    }

    get dialog_med(): { width: string, height: string } {
        return environment.dialogMed;
    }
}