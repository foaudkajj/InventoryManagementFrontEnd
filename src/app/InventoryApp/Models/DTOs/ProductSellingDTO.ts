import { Branch } from '../Branch';
import { Product } from '../Product';
import { PaymentMethod } from '../PaymentMethod';
import { SalePaymentMethod } from './SalePaymentMethod';

export interface ProductSellingDto {
    Total: number;
    UserId: number;
    BranchId: number;
    Receipt: string;
    PaymentMethodIds: number[];
    ProductIds: number[];
    SalePaymentMethods: SalePaymentMethod[];


}