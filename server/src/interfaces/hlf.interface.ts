export interface License {
  licenseId: string; // generate by uuid.
  appId: string;
  licenseDetails: string;
  creatorId: string;
  ownerId: string;
  assetType: string;
  assetId: string;
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

export interface LicenseData {
  Key: string;
  Record: License;
}
