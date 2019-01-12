import { ListableBase } from "micro-base";

export class ProductGroup extends ListableBase {
    organizationId: string;
    pivotLocation: string;
    pivotType: number;
    orientation: number;
    items: string;
}
