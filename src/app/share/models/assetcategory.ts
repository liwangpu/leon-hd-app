import { ListableBase } from "./listablebase";
export class AssetCategory extends ListableBase {
    value: string;
    organizationId: string;
    displayIndex: number;
    parentId: string;
    type: string;
    children: Array<AssetCategory>;
}