import { EntityBase } from "./entitybase";
import { PackageContent } from "./package-content";
export class Package extends EntityBase {
    description: string;
    icon: string;
    accountId: string
    state: string;
    stateTime: string;
    createdTime: string;
    modifiedTime: string;
    creator: string;
    modifier: string;
    content: string;
    contentIns: PackageContent;
}