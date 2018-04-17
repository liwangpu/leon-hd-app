
import { Iasset } from "./iasset";
import { ProductSpec } from "./productspec";
export class Product implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    id: string;
    name: string;
    specifications: ProductSpec[];
}
