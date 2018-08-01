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

    /**
     * 注销Memory实例
     */
    public static destroy() {
        this._instance = new Memory();
    }

    token: string;
    expires: string;
    nickName: string;
    userId: string;
    organId: string;
    icon: string;
    role: string;

    common_tip_403_status: string;

}
