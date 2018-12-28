import { ListableBase } from "@geek/micro-base";
import { OrderDetail } from "./order-detail";
import { OrderFlowLog } from "./order-flow-log";

export class Order extends ListableBase {
    orderNo: string;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    workFlowItemId: string;
    workFlowItemName: string;
    orderDetails: Array<OrderDetail>;
    orderFlowLogs: Array<OrderFlowLog>;
}
