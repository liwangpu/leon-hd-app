import { IEntity } from "./ientity";

export class EntityBase implements IEntity {
    id: string;
    name: string;
    description: string;
    creator: string;
    modifier: string;
    createdTime: string;
    modifiedTime: string;
    creatorName: string;
    modifiedName: string;
}
