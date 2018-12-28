import { ListableBase } from "@geek/micro-base";

export class Member extends ListableBase {
    phone: string;
    mail: string;
    company: string;
    province: string;
    city: string;
    area: string;
    superior: string;
    superiorName: string;
}
