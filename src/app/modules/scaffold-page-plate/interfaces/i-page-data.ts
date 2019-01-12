export interface IPageData {
    data: Array<any>;
    page: number;
    size: number;
    total: number;
    sort?: string;
    desc?: boolean;
}
