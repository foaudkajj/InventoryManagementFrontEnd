export interface ProductTypeDto {
    Id: number;
    Name: string;
    ProductPropertyIds: number[];
    ProductProperties: ProductPropertyDto[];
    Products: ProductDto[];
    ProductTypeAndProperties: ProductTypeAndPropertyDto[];
}