export class NavLink {
    id: string;
    title: string;
    type: string;
    icon: string;
    url?: string;
    editOp: boolean;
    children: Array<NavLink>;
}
