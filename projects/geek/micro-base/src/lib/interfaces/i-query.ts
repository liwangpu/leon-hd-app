export interface IQuery {
    search?: string;
    page?: number | string;
    pageSize?: number | string;
    orderBy?: string;
    desc?: boolean;
    plus?: object
}
