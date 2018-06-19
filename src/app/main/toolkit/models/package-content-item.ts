import { ProductGroup } from "./product-group";
import { Product } from "./product";
import { Material } from "./material";

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
    groupsMapIns: Array<ProductGroup>;
    productCategoryMapIns: Array<Product>;
    materialIns: Array<PackageMaterial>;
}

export class PackageMaterial {
    actorName: string;
    lastActorName: string;
    icon: string;
    materialId: string;
}