import { ListableBase } from "micro-base";
import { MediaShare } from "./media-share";


export class MediaFile extends ListableBase {
    fileAssetId: string;
    rotation: string;
    direction: string;
    type: string;
    mediaShares: Array<MediaShare>;
}
