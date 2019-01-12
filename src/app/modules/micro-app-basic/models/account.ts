import { Entity } from "micro-base";

export class Account extends Entity {
    password: string;
    phone: string;
    mail: string;
    expireTime: string;
    activationTime: string;
    organizationId: string;
    organizationName: string;
    organizationIcon: string;
    departmentId: string;
    departmentName: string;
    location: string;
    roleId: string;
    roleName: string;
    isAdmin: boolean;
    additionRoles: Array<{
        id: string,
        userRoleId: string,
        userRoleName: string
    }>;
}
