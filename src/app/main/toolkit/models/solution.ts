
import { Iasset } from "./iasset";
import { EntityBase } from "./entitybase";
export class Solution extends EntityBase implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
}
