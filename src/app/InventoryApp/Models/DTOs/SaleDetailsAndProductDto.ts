import { ProductDto } from '../ProductDto';
import { SalesDetailsDto } from './SalesDetailsDto';

export interface SaleDetailsAndProductDto {
    SaleId: number;
    Sale: SalesDetailsDto;
    ProductId: number;
    Product: ProductDto;
    ProductCount: number;
    Price: number;
}