import { ListableBase } from "./listablebase";
export class MediaShareResource extends ListableBase {
    mediaId: string;
    fileAssetId: string;
    rotation: string;
    direction: string;
    startShareTimeStamp: number;
    stopShareTimeStamp: number;
    password: string;
    type: string;
}