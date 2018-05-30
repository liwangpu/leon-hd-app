import { EntityBase } from "./entitybase";
import { Ilistable } from "./ilistable";
export class ListableBase extends EntityBase implements Ilistable {
    select: boolean;
    seqno: number;
    icon: string;
    iconAssetId: string;
}