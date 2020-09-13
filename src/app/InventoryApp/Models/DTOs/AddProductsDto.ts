import { ProductDto } from '../ProductDto';

export interface AddProductsDto {
    ExistedProducts: ProductDto[];
    AddedProducts: ProductDto[];
}