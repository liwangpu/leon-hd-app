import { ListableBase } from "@geek/micro-base";
import { Account } from "./account";
export class Department extends ListableBase {
    organizationId: string;
    members: Array<Account>;
}
