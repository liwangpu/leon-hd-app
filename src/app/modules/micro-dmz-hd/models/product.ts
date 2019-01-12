import { AssetBase } from "./asset-base";
import { ProductSpec } from "./product-spec";

export class Product extends AssetBase {
    unit: string;
    price: number;
    partnerPrice: number;
    purchasePrice: number;
    specifications: ProductSpec[];
}
