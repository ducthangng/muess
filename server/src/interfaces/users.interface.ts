export interface User {
  _id: string;
  email: string;
  fullname: string;
  password: string;
  x509Identity: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  fullname: string;
  dob: string;
  username: string;
}

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
