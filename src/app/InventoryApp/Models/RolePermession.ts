import { RoleAndRolePermession } from './RoleAndRolePermession';

export interface RolePermession {
    Id: number;
    RoleKey: string;
    Icon: string;
    Title: string;
    Translate: string;
    URL: string;
    ParentId: number;
    IsParent: boolean;
    Priority: number;
    RoleAndRolePermessions: RoleAndRolePermession[];
}