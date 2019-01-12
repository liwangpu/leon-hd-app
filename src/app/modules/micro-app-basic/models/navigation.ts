import { Entity } from "micro-base";

export class Navigation extends Entity {
    id: string;
    name: string;
    title?: string;
    resource?: string;
    url?: string;
    permission?: string;
    nodeType: string;
    grade?: number;
    parentId?: string;
    actived?: boolean;
    pagedModel?: string;
    field?: string;
    queryParams?: string;
    isInner: boolean;
}
