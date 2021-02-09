import { Color } from '../Color';
import { Branch } from '../Branch';
import { CampaignDto } from '../CampaignDto';

export interface ProductView {
  Id: number;
  ProductName: string;
  ProductBarcode: string;
  ProductCode: string;
  ColorName: string;
  Color: Color;
  Gender: string;
  Price: number;
  ProductYear: string;
  Size: number;
  Count: number;
  BranchName: string;
  SellingPrice: number;
  TempId: number;
  BranchId: number;
  Branch: Branch;
  Date: string;
  Description: string;
  ExpirationDate: Date;
  CampaingId: number;
  CampaignDto: CampaignDto;

}