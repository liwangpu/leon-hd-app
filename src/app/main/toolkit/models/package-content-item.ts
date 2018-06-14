import { ProductGroup } from "./product-group";

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
    // groupsMap: [string, string];
    //  Dictionary<string, string> GroupsMap  ;
    //  Dictionary<string, string> ProductCategoryMap ;
    //  Dictionary<string, string> Materials ;
    //  List<PackageProductSet> ReplaceGroups ;
}