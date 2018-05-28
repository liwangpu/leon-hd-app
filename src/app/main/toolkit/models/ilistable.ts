import { IEntitybase } from "./ientitybase";
export interface Ilistable extends IEntitybase {
    seqno: number;
    icon: string;
    iconAssetId: string;
}
