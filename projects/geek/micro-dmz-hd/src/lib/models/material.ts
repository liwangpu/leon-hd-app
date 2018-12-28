import { AssetBase } from "./asset-base";

export class Material extends AssetBase {
    staticMeshId: string;
    dependencies: string;
    parameters: string;
}
