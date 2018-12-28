import { ListableBase } from "@geek/micro-base";

export class UserRole extends ListableBase {
    role: string;
    isInner: boolean;
    applyOrgans: string;
}
