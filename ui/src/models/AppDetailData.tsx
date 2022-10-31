import React from 'react';

interface App {
  Key: string;
  Record: {
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
  };
}

interface AppDetailDataLicense {
  Key: string;
  Record: {
    assetType: string;
    assetId: string;
    creatorId: string;
    licenseDetails: string;
    ownerId: string;
  };
}

interface CreateAppData {
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

export type { App, AppDetailDataLicense, CreateAppData };
