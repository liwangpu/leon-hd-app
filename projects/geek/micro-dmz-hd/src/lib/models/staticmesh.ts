import { Material } from "./material";
import { AssetBase } from "./asset-base";

export class Staticmesh extends AssetBase {
    materials?: Array<Material>;
    dependencies: string;
    properties: string;
}
