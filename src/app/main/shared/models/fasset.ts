import { Asset } from './asset';
export class FAsset extends Asset {
    url: string;
    md5: string
    size: number;
    fileExt: string
    uocalPath: string
    uploadTime: string
}