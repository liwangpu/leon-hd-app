import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
@Injectable()
export class ConfigService {

    get serverBase() {
        return environment.serveBase;
    }

    get loginStyle() {
        return environment.loginStyle;
    }

    get isMaintaining() {
        return environment.isMaintaining;
    }

    get maintainingEndDate() {
        return environment.maintainingEndDate;
    }

    get language() {
        return environment.language;
    }
    get dialog_min(): { width: string, height: string } {
        return environment.dialogMin;
    }

    get dialog_med(): { width: string, height: string } {
        return environment.dialogMed;
    }
}