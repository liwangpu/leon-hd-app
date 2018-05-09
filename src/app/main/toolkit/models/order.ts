import { EntityBase } from "./entitybase";
import { OrderContent } from "./order-content";
export class Order extends EntityBase {
    description: string;
    icon: string;
    accountId: string
    state: string;
    stateTime: string;
    createdTime: string;
    modifiedTime: string;
    creator: string;
    modifier: string;
    content: string;
    contentIns:OrderContent;
}