export interface IPageData<E> {
    data: Array<E>;
    page: number;
    size: number;
    total: number;
}
