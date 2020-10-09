import { ProductPropertyDto } from './ProductPropertyDto';
import { ProductTypeDto } from './ProductType';

export interface ProductTypeAndPropertyDto {
    ProductPropertyId: number;
    ProductProperty: ProductPropertyDto;
    ProductTypeId: number;
    ProductType: ProductTypeDto;
}