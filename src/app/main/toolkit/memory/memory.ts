import { NavigationData } from "../models/navigation-data";
import { Subject } from "rxjs";

/**
 * 该类用于存储一些内存流的数据
 * 因为基于服务的存储无法进入interceptor
 */
export class Memory {
    /**************** Singleton ****************/
    private static _instance: Memory;
    private constructor() { }
    /**************** Singleton End ****************/

    /**
    * 获取Memory实例
    */
    public static getInstance(): Memory {
        if (!this._instance) {
            this._instance = new Memory();
        }
        return this._instance;
    }

    private _navigationDatas: Array<NavigationData> = [];
    token: string;
    loginStyle: number;
    isMaintaining: boolean;
    maintainingEndDate: Date;
    language: string;
    navi: string;
    nickName: string;
    icon: string;
    userId: string;
    organId: string;
    departmentId: string;
    afterGetNavigation$: Subject<void> = new Subject();
    set navigationDatas(vl: Array<NavigationData>) {
        this._navigationDatas = vl;
        this.afterGetNavigation$.next();
    }
    get navigationDatas() {
        return this._navigationDatas;
    }


}