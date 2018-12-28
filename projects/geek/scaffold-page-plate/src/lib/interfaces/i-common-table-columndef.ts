export interface ICommonTableColumndef {
    id: string;
    name: string;
    description?: string;
    width?: number;
    needTranslate?: boolean;
    transToCheckFlag?: boolean;
    cell(data: any): any;
}
