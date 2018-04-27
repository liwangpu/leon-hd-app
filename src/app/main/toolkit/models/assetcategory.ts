import { EntityBase } from "./entitybase";
export class AssetCategory extends EntityBase {
    icon: string;
    organizationId: string;
    displayIndex: number;
    parentId: string;
    description: string;
    children: Array<AssetCategory>;
}