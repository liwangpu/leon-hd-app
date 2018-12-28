import { ListableBase } from "@geek/micro-base";

export class MemberRegistry extends ListableBase {
    phone: string;
    mail: string;
    company: string;
    province: string;
    city: string;
    area: string;
}
