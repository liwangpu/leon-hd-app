import { AssetBase } from "./asset-base";
import { Product } from "./product";

export class ProductReplaceGroup extends AssetBase {
    defaultItemId: string;
    defaultItem: Product;
    groupItems: Array<Product>;
}
