export class RefundProductsDto {
    SaleId: number[];
    ProductId: number[];

    /**
     *
     */
    constructor() {
        this.SaleId = [];
        this.ProductId = [];
    }
}