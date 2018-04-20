import { EntityBase } from "./entitybase";
import { Ilistable } from "./ilistable";
import { Account } from "./account";
export class Department extends EntityBase implements Ilistable {
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    id: string;
    name: string;
    organizationId: string;
    members: Array<Account>;
}