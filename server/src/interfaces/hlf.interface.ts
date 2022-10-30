export interface License {
  licenseId: string; // generate by uuid.
  licenseName: string;
  productId: string;
  licenseDetails: string;
  creatorId: string;
  ownerId: string;
  assetType: string;
}

export interface Proposal {
  assetType: string;
  assetId: string;
  appId: string;
  buyerId: string;
  sellerId: string;
  proposedPrice: number;
  licenseDetails: string;
  status: string;
}
