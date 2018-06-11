import { PackageContentItem, PackageArea } from "./package-content-item";
export class PackageContent {
    areas: Array<PackageArea>;
    items: Array<PackageContentItem>;
    totalPrice: number;
    remark: string;
}