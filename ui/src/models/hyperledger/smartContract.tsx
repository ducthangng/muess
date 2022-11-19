export interface SmartContract {
  productId: string;
  provider: string;
  price: number;
  purchaseDate: number; // UNIX int64
  smartContractInfo: string;
}
