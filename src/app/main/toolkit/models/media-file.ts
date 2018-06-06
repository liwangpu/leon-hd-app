import { ListableBase } from "./listablebase";
import { MediaShareResource } from "./media-share-resource";
export class MediaFile extends ListableBase {
    fileAssetId: string;
    rotation: string;
    direction: string;
    mediaShares: Array<MediaShareResource>;
}