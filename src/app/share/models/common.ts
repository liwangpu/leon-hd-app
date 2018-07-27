export class UIListBSModel {
    resource: string;
    icon: string;
    modelType: string;
    displayModel: Array<string>;
    fields: Array<UIListBSModelField>;
}

export class UIListBSModelField {
    id: string;
    name: string;
    description: string;
    width: number;
    expression: string;
}

/**
 * 查询分页信息
 */
export class Paging<E> {
    data: Array<E>;
    page: number;
    size: number;
    total: number;
}

/**
 * 查询参数
 */
export interface IQuery {
    search?: string;
    // order?: string;
    page?: number | string;
    pageSize?: number | string;
    orderBy?: string;
    desc?: boolean;
    plus?: object
}

export interface IQueryFilter{
    field:string;
    value:string;
    operate?:QueryOperateEnums;
}

export enum QueryOperateEnums {
    equal = 'equal'
}