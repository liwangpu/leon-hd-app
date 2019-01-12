import { ListableBase } from "micro-base";
import { WorkFlowItem } from "./work-flow-item";

export class WorkFlow extends ListableBase {
    applyOrgans:string;
    workFlowItems:Array<WorkFlowItem>;
}
