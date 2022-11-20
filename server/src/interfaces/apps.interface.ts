export interface App {
  assetType: string;
  assetId: string; // queries
  creatorId: string; // queries
  creatorName: string; // queries
  title: string;
  description: string;
  rating: string;
  appType: string;
  paymentMethod: string;
  appTags: string[];
  appCategories: string[];
  appIconURL: string;
  averageProposedPrice: number;
  proposalQuantity: number;
}

export interface ChaincodeApp {
  Key: string;
  Record: App;
}
