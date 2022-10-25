import { IsString } from 'class-validator';

export class APISmartContract {
  @IsString()
  productId: string;
  provider: string;
  price: number;
  purchaseDate: Date;
  smartContractInfo: string;
}
