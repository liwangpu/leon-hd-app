
import { ProductSpec } from "./productspec";
import { AssetBase } from "./assetbase";
export class Product extends AssetBase {
    price: number;
    partnerPrice: number;
    purchasePrice: number;
    specifications: ProductSpec[];
}
