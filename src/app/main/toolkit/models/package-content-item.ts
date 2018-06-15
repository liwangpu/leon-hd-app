import { ProductGroup } from "./product-group";
import { Product } from "./product";

export class PackageContentItem {
    productId: string;
    productSpecId: string;
    productName: string;
    productSpecName: string;
    num: number;
    unitPrice: number;
    totalPrice: number;
    remark: string;
}

export class PackageArea {
    id: string;
    areaTypeId: string;
    areaAlias: string;
    groupsMapIns:Array<ProductGroup>;
    productCategoryMapIns:Array<Product>;
}