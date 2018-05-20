import { QueryOperateEnums } from "../../enums/enums";

export interface IQueryFilter{
    field:string;
    value:string;
    operate?:QueryOperateEnums;
}