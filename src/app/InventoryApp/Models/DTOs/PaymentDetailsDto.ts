export declare interface PaymentDetailsDto {

    PaymentId: number;
    paymentName?: string;
    paymentType?: boolean;
    defferedPaymentCount: number;
    receipt: string;
    amount: number;
}