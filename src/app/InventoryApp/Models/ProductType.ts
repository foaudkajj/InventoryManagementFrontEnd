import { ProductDto } from './ProductDto';
import { ProductPropertyDto } from './ProductPropertyDto';
import { ProductTypeAndPropertyDto } from './ProductTypeAndPropertyDto';

export interface ProductTypeDto {
    Id: number;
    Name: string;
    ProductPropertyIds: number[];
    ProductProperties: ProductPropertyDto[];
    Products: ProductDto[];
    ProductTypeAndProperties: ProductTypeAndPropertyDto[];
}