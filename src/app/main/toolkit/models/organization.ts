import { Ilistable } from "./ilistable";
import { EntityBase } from "./entitybase";
export class Organization extends EntityBase implements Ilistable {
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
}