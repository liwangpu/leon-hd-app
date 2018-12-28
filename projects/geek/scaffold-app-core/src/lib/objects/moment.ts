export class Moment {
    static toDate(datestr: string): Date {
        //转的时候Date()对参数的格式有要求，其中-要改成/，点和毫秒也要去掉
        datestr = datestr.replace(/-/g, "/");
        datestr = datestr.replace(/(\.\d+)?/g, "");
        return new Date(datestr);
    }
}
