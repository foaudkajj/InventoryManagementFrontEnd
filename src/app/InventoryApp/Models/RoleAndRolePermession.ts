import { Role } from './Role';
import { RolePermession } from './RolePermession';

export interface RoleAndRolePermession {
    Id: number;
    EditingAuthorities: string;
    RolePermessionId: number;
    RolePermession: RolePermession;
    RoleId: number;
    Role: Role;
}