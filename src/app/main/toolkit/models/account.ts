import { Ilistable } from "./ilistable";
import { ListableBase } from "./listablebase";
export class Account extends ListableBase{
    password: string;
    phone: string;
    mail: string;
    expireTime: string;
    activationTime: string;
    organizationId: string;
    departmentId: string;
    location: string;
    type: string;
}