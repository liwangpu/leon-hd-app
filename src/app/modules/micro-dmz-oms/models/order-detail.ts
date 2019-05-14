import { Entity } from "micro-base";
import { OrderDetailPackage } from "./order-detail-package";

export class OrderDetail extends Entity {
    productSpecId: string;
    num: number;
    unitPrice: number;
    totalPrice: number;
    remark: string;
    orderDetailStateId: number;
    productName: string;
    productUnit: string;
    productBrand: string;
    productDescription: string;
    productSpecName: string;
    attachmentIds: string;
    attachments: Array<{ id: string, name: string, url: string }>;
    packages:Array<OrderDetailPackage>;
}
