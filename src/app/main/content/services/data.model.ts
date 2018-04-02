// 数据模型类
// typescript 中 成员可见性默认是 public， 私有才需要明确指定 private。 继承用 extends。 class需要加export才可供外部模块使用

export class PagedData<T>
{
    data: T[];
    page: number;
    size: number;
    total: number;
}


export class EntityBase
{
    id: string;
    name: string;
}

export class ListableEntity extends EntityBase
{
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
}

export class Asset extends ListableEntity
{
    folderId: string;
    categoryId: string;
}

export class Product extends Asset
{
    specifications: ProductSpec[];
}

/// 产品规格
export class ProductSpec
{
    id: string;
    name: string;
    icon: string;
    mesh: string;
    description: string;
    materials: string;

    /// 价格，单位为元
    price: string;
    /// 第三方ID，此产品在供应商自己的系统比如ERP的ID
    tpid: string;
    
    /// 所在产品的ID
    productId: string;
}

export class Order extends ListableEntity
{
    state: string;
    stateTime: string;
    childOrders: string;
    content: string;
    orderStates: OrderStateItem[];
}

export class OrderStateItem
{
    id: string;
    oldState: string;
    newState: string;
    operatorAccount: string;
    operateTime: string;
    reason: string;
    detail: string;
    orderId: string;
    solutionId: string;
}