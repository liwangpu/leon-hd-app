import { FileAsset } from "./file-asset";
import { ListableBase } from "micro-base";

export class AssetBase extends ListableBase {
    categoryId: string;
    categoryName: string;
    fileAssetId: string;
    fileAsset?: FileAsset;
    creatorName: string;
    modifierName: string;
}