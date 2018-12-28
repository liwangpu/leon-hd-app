import { ListableBase } from "@geek/micro-base";
import { Account } from "./account";
import { Department } from "./department";

export class Organization extends ListableBase {
    owner: Account;
    location: string;
    expireTime: string;
    activationTime: string;
    organizationTypeId: string;
    organizationTypeName: string;
    departments: Array<Department>;
}
