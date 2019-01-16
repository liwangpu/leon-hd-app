import { ListableBase } from "micro-base";

export class Member extends ListableBase {
    phone: string;
    mail: string;
    company: string;
    province: string;
    city: string;
    county: string;
    provinceName: string;
    cityName: string;
    countyName: string;
    superior: string;
    superiorName: string;
}