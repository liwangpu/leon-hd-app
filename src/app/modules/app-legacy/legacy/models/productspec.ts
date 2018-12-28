import { StaticMesh } from "./staticmesh";
import { FileAsset } from "./fileasset";
import { ListableBase } from "./listablebase";
export class ProductSpec extends ListableBase {
    /// 价格，单位为元
    price: string;
    /// 第三方ID，此产品在供应商自己的系统比如ERP的ID
    tpid: string;

    /// 所在产品的ID
    productId: string;

    staticMeshes: Array<StaticMesh>;
    album: Array<FileAsset>;
    iconAsset: FileAsset;
}
