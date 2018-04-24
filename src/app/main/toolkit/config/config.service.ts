import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const SERVER_BASE = 'http://localhost:1882';
// const SERVER_BASE = "http://testapi.damaozhu.com.cn";
const LOGIN_STYLE = 2;
const IS_MAINTAINING = false;
const MAINTAINING_ENDDATE = '';
const rememberLogin = true;
const LANGUAGE = 'en';

@Injectable()
export class ConfigService {

    get serverBase() {
        return SERVER_BASE;
    }

    get loginStyle() {
        return LOGIN_STYLE;
    }

    get isMaintaining() {
        return IS_MAINTAINING;
    }

    get maintainingEndDate() {
        return MAINTAINING_ENDDATE;
    }

    get language() {
        return LANGUAGE;
    }
}