import { Iasset } from "./iasset";
import { EntityBase } from "./entitybase";
export class FileAsset extends EntityBase implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    url: string;
    md5: string
    size: number;
    fileExt: string
    uocalPath: string
    uploadTime: string
}
