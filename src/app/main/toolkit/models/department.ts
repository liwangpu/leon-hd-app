
import { ListableBase } from "./listablebase";
import { Account } from "./account";
export class Department extends ListableBase {
    organizationId: string;
    members: Array<Account>;
}