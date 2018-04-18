import { Iasset } from "./iasset";
import { EntityBase } from "./entitybase";
export class Asset extends EntityBase implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    id: string;
    name: string;
}
