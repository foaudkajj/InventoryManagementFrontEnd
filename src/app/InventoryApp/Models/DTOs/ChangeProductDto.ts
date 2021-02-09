import { CustomerInfoDto } from './CustomerInfoDto';
import { NewProductListToTakeDto } from './NewProductListToTakeDto';
import { PaymentDetailsDto } from './PaymentDetailsDto';
import { ProductSellingDto } from './ProductSellingDTO';
import { SaleDetailsAndProductDto } from './SaleDetailsAndProductDto';

export interface ChangeProductDto {
    SaleIdOfOldProdcuts: number;
    ProductIdListOfPreviouslyTakenProducts: number[];
    Total: number;
    paymentDetails: PaymentDetailsDto[];
    customerInfoDto: CustomerInfoDto;
    newProductListToTake: NewProductListToTakeDto
}