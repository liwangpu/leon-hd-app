import { Asset } from './asset';
import { ProductSpec } from './productSpec';
export class Product extends Asset {
    specifications: ProductSpec[];
}
