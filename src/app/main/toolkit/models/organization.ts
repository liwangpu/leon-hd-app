import { ListableBase } from "./listablebase";
import { Account } from "./account";
import { Department } from "./department";
export class Organization extends ListableBase {
    owner: Account;
    mail: string;
    location: string;
    departments: Array<Department>;
}