import { ListableBase } from "micro-base";

export class MediaShare extends ListableBase {
    mediaId: string;
    fileAssetId: string;
    rotation: string;
    direction: string;
    startShareTimeStamp: number;
    stopShareTimeStamp: number;
    password: string;
    type: string;
    url: string;
}
