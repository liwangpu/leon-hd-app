import { Iasset } from "./iasset";
import { StaticMesh } from "./staticmesh";
import { FileAsset } from "./fileasset";
export class ProductSpec implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    id: string;
    name: string;
    /// 价格，单位为元
    price: string;
    /// 第三方ID，此产品在供应商自己的系统比如ERP的ID
    tpid: string;

    /// 所在产品的ID
    productId: string;

    staticMeshes: Array<StaticMesh>;
    charlets: Array<FileAsset>;
}
