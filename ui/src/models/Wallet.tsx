export interface Wallet {
  purchasedAppNumber: number;
  soldAppNumber: number;
  moneyMade: number;
  moneySpend: number;
  totalBalance: number;

  spending: GraphData[];
  income: GraphData[];
}

export interface GraphData {
  unit: string;
  amount: number;
}
