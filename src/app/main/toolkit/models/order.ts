import { ListableBase } from "./listablebase";
import { OrderContent } from "./order-content";
export class Order extends ListableBase {
    state: string;
    stateTime: string;
    content: string;
    contentIns: OrderContent;
}