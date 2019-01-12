import { AssetBase } from "./asset-base";

export class FileAsset extends AssetBase {
    url: string;
    md5: string
    size: number;
    fileExt: string
    uocalPath: string
    uploadTime: string
}
