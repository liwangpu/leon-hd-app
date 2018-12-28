import { ListableBase } from "./listablebase";
export class Account extends ListableBase{
    password: string;
    phone: string;
    mail: string;
    expireTime: string;
    activationTime: string;
    organizationId: string;
    departmentId: string;
    departmentName: string;
    location: string;
    type: string;
    isAdmin:boolean;
}