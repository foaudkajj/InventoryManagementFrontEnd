import { PaymentDetailsDto } from './PaymentDetailsDto';
import { SoledProductDetailsDto } from './SoledProductDetailsDto';

export declare interface SaleUserBranchProductsDTO {
    id: number;
    userCode: string;
    date: string;
    branchName: string;
    total: number;
    soledProductDetails: SoledProductDetailsDto[];
    paymentDetails: PaymentDetailsDto[];
}