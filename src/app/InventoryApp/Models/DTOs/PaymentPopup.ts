import { CustomerInfoDto } from './CustomerInfoDto';

export interface PaymentPopup {
    PaymentName: string;
    DefferedPaymentCount: number;
    Amount: number;
    PaymentMethodId: number;
    Receipt: string;
    CustomerInfo: CustomerInfoDto
}