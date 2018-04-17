import { IEntitybase } from "./ientitybase";
export interface Ilistable extends IEntitybase {
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
}
