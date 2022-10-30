export interface App {
  assetType: string;
  assetId: string; // queries
  creatorId: string; // queries
  title: string;
  description: string;
  rating: string;
  appType: string;
  paymentMethod: string;
  appTags: string[];
  appCategories: string[];
  appIconURL: string;
}
