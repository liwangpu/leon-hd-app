import { Injectable } from '@angular/core';

@Injectable()
export class LocalStoreService {
    constructor() {

    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    getItem(key: string) {
        return localStorage.getItem(key);
    }
}