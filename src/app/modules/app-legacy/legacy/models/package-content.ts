import { PackageContentItem, PackageArea } from "./package-content-item";
import { ProductReplaceGroup } from "./product-replace-group";
export class PackageContent {
    areas: Array<PackageArea>;
    items: Array<PackageContentItem>;
    totalPrice: number;
    remark: string;
    replaceGroups: Array<string>;
    replaceGroupIns: Array<ProductReplaceGroup>;
}