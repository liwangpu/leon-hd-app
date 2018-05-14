import { Iasset } from "./iasset";
import { StaticMesh } from "./staticmesh";
import { FileAsset } from "./fileasset";
import { EntityBase } from "./entitybase";
export class ProductSpec extends EntityBase implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
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
