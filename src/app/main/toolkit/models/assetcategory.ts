import { ListableBase } from "./listablebase";
export class AssetCategory extends ListableBase {
    organizationId: string;
    displayIndex: number;
    parentId: string;
    type: string;
    children: Array<AssetCategory>;
}