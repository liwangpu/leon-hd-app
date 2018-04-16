import { EntityBase } from './entityBase';
import { StaticMesh } from './staticeMesh';
import { FAsset } from './fasset';
export class ProductSpec extends EntityBase {
    icon: FAsset;
    mesh: string;
    description: string;
    materials: string;

    /// 价格，单位为元
    price: string;
    /// 第三方ID，此产品在供应商自己的系统比如ERP的ID
    tpid: string;

    /// 所在产品的ID
    productId: string;

    staticMeshes: Array<StaticMesh>;
    charlets: Array<FAsset>;
}