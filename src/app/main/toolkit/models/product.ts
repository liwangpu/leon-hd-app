
import { Iasset } from "./iasset";
import { ProductSpec } from "./productspec";
import { EntityBase } from "./entitybase";
export class Product extends EntityBase implements Iasset {
    folderId: string;
    categoryId: string;
    categoryName: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    specifications: ProductSpec[];
}
