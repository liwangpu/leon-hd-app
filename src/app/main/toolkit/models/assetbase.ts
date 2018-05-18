import { ListableBase } from "./listablebase";
import { Iasset } from "./iasset";
import { FileAsset } from "./fileasset";
export class AssetBase extends ListableBase implements Iasset {
    categoryId: string;
    fileAssetId: string;
    fileAsset?: FileAsset;
}