import { Injectable } from '@angular/core';

@Injectable()
export class LocalStoreService {
    constructor() {

    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    getItem(key: string) {
        let vl = localStorage.getItem(key);
        if (vl != null && vl.toString() != 'null' && vl.toString() != 'undefined')
            return localStorage.getItem(key);
        return undefined;
    }
}