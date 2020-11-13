import { Branch } from '../Branch';
import { User } from '../User';
import { SaleDetailsAndProductDto } from './SaleDetailsAndProductDto';
import { SalePaymentMethod } from './SalePaymentMethod';

export interface SalesDetailsDto {
    Id: number;
    Date: string;
    Total: number;
    UserId: number;
    User: User;
    BranchId: number;
    Branch: Branch;
    SaleDetailsAndProducts: SaleDetailsAndProductDto[];
    SalePaymentMethods: SalePaymentMethod[];
}