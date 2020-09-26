import { RoleAndRolePermession } from './RoleAndRolePermession';
import { User } from './User';

export interface Role {
    Id: number;
    RoleGroupId: number;
    RoleName: string;
    RoleAndRolePermessions: RoleAndRolePermession[];
    Users: User[];
}