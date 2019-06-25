import { AssetBase } from "./asset-base";
import { ProductSpec } from "./product-spec";

export class Product extends AssetBase {
    unit: string;
    price: number;
    brand: string;
    partnerPrice: number;
    purchasePrice: number;
    tpid: string;
    specifications: ProductSpec[];
}
