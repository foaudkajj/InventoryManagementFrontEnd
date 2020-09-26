import { UserStatus } from '../Enums/UserStatus';
import { FuseNavigation } from '@fuse/types';

export interface LoginResponse {
    userName: string;
    userCode: string;
    userStatus: UserStatus;
    token: string;
    isAuthenticated: boolean;
    navigationItems: FuseNavigation[];
}