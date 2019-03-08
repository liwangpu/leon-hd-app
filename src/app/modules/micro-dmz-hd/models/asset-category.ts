import { ListableBase } from "micro-base";

export class AssetCategory extends ListableBase {
    isRoot: boolean;
    organizationId: string;
    displayIndex: number;
    parentId: string;
    type: string;
    isolate: boolean;
    tag: string;
    children: Array<AssetCategory>;
}
