import { UserStatus } from '../Enums/UserStatus';

export interface User {
    id: number;
    userName: string;
    userCode: string;
    userStatus: UserStatus;
    password: string;
    imagePath: string;
    email: string;
    cellphone: string;
    lastSuccesfulLoginDate: string | null;
    salt: string;
    name: string;
    lastName: string;
    branchId: number | null;
}


