import { Iasset } from "./iasset";
export class Asset implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    id: string;
    name: string;
}
