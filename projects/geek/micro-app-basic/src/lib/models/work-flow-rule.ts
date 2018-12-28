import { ListableBase } from "@geek/micro-base";

export class WorkFlowRule extends ListableBase {
    keyword: string;
    isInner: boolean;
    workFlowName:string;
}
