import { EntityBase } from "./entitybase";
import { Ilistable } from "./ilistable";
export class ListableBase extends EntityBase implements Ilistable{
    icon: string;
    iconAssetId: string;
}