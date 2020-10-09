export interface ProductDto {
  Id?: number;
  ProductName: string;
  ProductBarcode: string;
  ProductCode: string;
  ColorId: number;
  Gender: boolean;
  Price: string;
  SellingPrice: string;
  ProductYear: string;
  Size: number;
  BranchId: number;
  Count: number;
  Description?: string;
  ExpirationDate?: Date;
  ProductTypeId: number;

}