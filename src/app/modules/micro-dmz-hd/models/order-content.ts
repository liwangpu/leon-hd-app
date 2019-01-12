import { OrderContentItem } from "./order-content-item";

export class OrderContent {
    items: Array<OrderContentItem>;
    totalPrice: number;
    remark: string;
}
