import { IsString } from 'class-validator';

export interface APISmartContract {
  productId: string;
  provider: string;
  price: number;
  purchaseDate: number; // UNIX int64
  smartContractInfo: string;
}
