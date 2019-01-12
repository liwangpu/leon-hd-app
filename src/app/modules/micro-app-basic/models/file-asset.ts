import { ListableBase } from "micro-base";

export class FileAsset extends ListableBase {
    url: string;
    md5: string
    size: number;
    fileExt: string
    uocalPath: string
    uploadTime: string
}
