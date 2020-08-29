import { UserStatus } from '../Enums/UserStatus';
import { FuseNavigation } from '@fuse/types';

export interface LoginResponse {
    UserName: string;
    UserCode: string;
    UserStatus: UserStatus;
    Token: string;
    IsAuthenticated: boolean;
    NavigationItems: FuseNavigation[];
}