export class NavigationData {
    /// <summary>
    /// 所有菜单里面唯一的字符串即可
    /// </summary>
    id: string;
    /// <summary>
    /// 标题，为了配合多语言，这里可以写成翻译值。
    /// </summary>
    title: string;
    /// <summary>
    /// 菜单的类型，可以为 group / item / collapse.  group为大分类，item为单个， collapse为文件夹
    /// </summary>
    type: string;
    /// <summary>
    /// icon 为图标字体的内容。比如 chat, email, account_box, check_box, alerm. 也可以为空
    /// </summary>
    icon: string;
    /// <summary>
    /// 内部导航路径，比如 /pages/auth/login， /apps/dashboards/project 
    /// </summary>
    url: string;
    /// <summary>
    /// 用户是否有编辑权限
    /// </summary>
    editOp: boolean;
    /// <summary>
    /// 徽章，也就是消息数量提醒用。可以为null。
    /// </summary>
    badge: any;
    /// <summary>
    /// 子菜单,可以为null
    /// </summary>
    children: Array<NavigationData>;
}