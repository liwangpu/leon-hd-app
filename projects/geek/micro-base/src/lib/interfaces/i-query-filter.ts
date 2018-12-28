import { QueryOperateEnum } from "../enums/query-operate-enum";

export interface IQueryFilter {
    field: string;
    value: any;
    operate: QueryOperateEnum;
}
