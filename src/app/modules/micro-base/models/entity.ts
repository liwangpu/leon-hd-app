import { IEntity } from "../interfaces/i-entity";

export class Entity implements IEntity {
    id: string;
    name: string;
    icon: string;
    description: string;
    creator: string;
    modifier: string;
    createdTime: string;
    modifiedTime: string;
    creatorName: string;
    modifiedName: string;
    activeFlag: number;
}
