import { ProductSellingDto } from './ProductSellingDTO';
import { SaleDetailsAndProductDto } from './SaleDetailsAndProductDto';

export interface ChangeProductDto {
    productsToChangeWith: ProductSellingDto;
    purchasedProductsToChange: SaleDetailsAndProductDto[];
}