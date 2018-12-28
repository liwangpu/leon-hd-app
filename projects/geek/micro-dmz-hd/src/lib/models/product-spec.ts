import { ListableBase } from "@geek/micro-base";
import { Staticmesh } from "./staticmesh";
import { FileAsset } from "./file-asset";

export class ProductSpec extends ListableBase {
    price: string;
    tpid: string;
    productId: string;
    staticMeshes: Array<Staticmesh>;
    album: Array<FileAsset>;
    iconAsset: FileAsset;
}
