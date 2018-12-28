export interface IListViewAdvanceMenu {
    name: string;
    icon: string;
    permissionPoint?: string;//菜单权限点
    needSelectedItem?: boolean;//是否需要先选中项目
    onClick(selectedItems?: Array<string>): void;
}
