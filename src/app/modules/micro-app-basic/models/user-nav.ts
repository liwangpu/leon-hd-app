import { Entity } from "micro-base";
import { Navigation } from "./navigation";

export class UserNav extends Entity {
    roleId: string;
    roleName: string;
    userNavDetails: Array<Navigation>;
}
