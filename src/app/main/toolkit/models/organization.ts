import { Ilistable } from "./ilistable";
import { EntityBase } from "./entitybase";
import { Account } from "./account";
export class Organization extends EntityBase implements Ilistable {
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    owner: Account;
}