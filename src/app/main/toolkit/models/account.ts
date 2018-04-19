import { Ilistable } from "./ilistable";
import { EntityBase } from "./entitybase";
export class Account extends EntityBase implements Ilistable {
    password: string;
    createTime: string;
    modifyTime: string;
    description: string;
    icon: string;
    id: string;
    name: string;
    phone: string;
    mail: string;
    expireTime: string; 
    activationTime:string;
    organizationId: string;
    departmentId: string;
    location: string;
    type: string;
}