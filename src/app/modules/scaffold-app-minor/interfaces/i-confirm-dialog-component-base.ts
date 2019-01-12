import { Subject } from "rxjs";
import { IConfirmDialogComponentButton } from "./i-confirm-dialog-component-button";

export interface IConfirmDialogComponentBase {
    /**
  * [对话框] => [自定义组件]
  * 供自定义模版组件订阅,用于接收确认对话框点击"确认"按钮响应
  */
    afterConfirm$: Subject<void>;
    /**
     * [对话框] => [自定义组件]
     * 供自定义模版组件订阅,用于接收确认对话框点击"取消"按钮响应
     */
    afterCancel$: Subject<void>;
    /**
     * [自定义组件] => [对话框]
     * 供对话框订阅,用于接收自定义模版组件触发"启用|禁用确认按钮"响应(默认确认按钮禁用)
     */
    satisfyConfirm$: Subject<boolean>;
    /**
     * [自定义组件] => [对话框]
     * 供对话框订阅,用于接收自定义模版组件触发"关闭对话框"响应
     */
    closeDialog$: Subject<void>;
    /**
     * [自定义组件] => [对话框]
     * 供对话框订阅,用于接收自定义模版组件触发"禁止|允许关闭对话框"响应
     */
    persistDialog$: Subject<boolean>;
    /**
     * [自定义组件] => [对话框]
     * 供对话框订阅,用于接收自定义模版组件触发"禁用|启用所有按钮(确认,取消)"响应
     */
    disableButtons$: Subject<boolean>;
    /**
     * [自定义组件] => [对话框]
     * 供对话框订阅,用于接收自定义模版组件触发"禁用|启用确认按钮"响应
     */
    disableConfirmButton$: Subject<boolean>;
    /**
     * [自定义组件] => [对话框]
     * 供对话框订阅,用于接收自定义模版组件触发"禁用|启用取消按钮"响应
     */
    disableCancelButton$: Subject<boolean>;
    /**
     * [自定义组件] => [对话框]
     * 供对话框订阅,用于接收自定义模版组件触发"事情做完"响应
     * 因为默认认为,开始点击[确认]按钮后开始做一件async事,又因为模版组会写有自定义逻辑
     * 如果对话框关闭,自定义逻辑将被销毁
     * 所以[确认]点击后,对话框所有按钮禁用,同时也不能关闭对话框
     * 直到用户触发doneAsync后
     */
    doneAsync$: Subject<boolean>;

    /**
     * 隐藏取消按钮
     */
    hideCancelButton?: boolean;

    /**
 * 自定义按钮
 */
    manageButtons?: Array<IConfirmDialogComponentButton>;
}
