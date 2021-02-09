export interface RefundProductsDto {
    SaleIdOfOldProdcuts: number;
    ProductIdListOfPreviouslyTakenProducts: number[];
    Total: number;
    CustomerInfoId: number;
}