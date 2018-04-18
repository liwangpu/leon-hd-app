import { IEntitybase } from "./ientitybase";
export class EntityBase implements IEntitybase {
    id: string;
    name: string;

    /**
     * 持久化的实体
     */
    isPersistence() {
        if (this.id)
            return true;
        return false;
    }
}