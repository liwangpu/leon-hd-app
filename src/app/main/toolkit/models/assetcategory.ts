import { EntityBase } from "./entitybase";
export class AssetCategory extends EntityBase {
    icon: string;
    organizationId: string;
    displayIndex: number;
    parentId: string;
    description: string;
    type: string;
    children: Array<AssetCategory>;
}