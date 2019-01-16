import { IEntitybase } from "./ientitybase";
export class EntityBase implements IEntitybase {
    creatorName: string;
    modifierName: string;
    id: string;
    name: string;
    description: string;
    createdTime: string;
    modifiedTime: string;
    creator: string;
    modifier: string;
    activeFlag: number;
    resourceType: number;

    /**
     * 持久化的实体
     */
    isPersistence() {
        if (this.id)
            return true;
        return false;
    }
}