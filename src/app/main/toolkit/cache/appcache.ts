/**
 * 该类用于存储一些内存流的数据
 * 因为基于服务的存储无法进入interceptor
 */
export class AppCache {
    /**************** Singleton ****************/
    private static _instance: AppCache;
    private constructor() { }
    /**************** Singleton End ****************/

    /**
    * 获取AppCache实例
    */
    public static getInstance(): AppCache {
        if (!this._instance) {
            this._instance = new AppCache();
        }
        return this._instance;
    }

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
}