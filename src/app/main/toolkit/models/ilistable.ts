import { IEntitybase } from "./ientitybase";
export interface Ilistable extends IEntitybase {
    select: boolean;
    seqno: number;
    icon: string;
    iconAssetId: string;
    resourceType: number;
}
