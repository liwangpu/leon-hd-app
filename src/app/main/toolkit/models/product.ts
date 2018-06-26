
import { ProductSpec } from "./productspec";
import { AssetBase } from "./assetbase";
export class Product extends AssetBase {
    price: number;
    specifications: ProductSpec[];
}
