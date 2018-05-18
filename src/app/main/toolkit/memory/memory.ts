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