import { ListableBase } from "./listablebase";
import { PackageContent } from "./package-content";
export class Package extends ListableBase {
    state: string;
    stateTime: string;
    content: string;
    contentIns?: PackageContent;
}