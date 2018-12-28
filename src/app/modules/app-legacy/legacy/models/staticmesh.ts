import { Material } from "./material";
import { AssetBase } from "./assetbase";
export class StaticMesh extends AssetBase {
    materials?: Array<Material>;
    dependencies: string;
    properties: string;
}
