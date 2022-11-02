import React from 'react';

interface App {
  Key: string;
  Record: {
    assetType: string;
    assetId: string; // queries
    creatorId: string; // queries
    creatorName: string;
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
  };
}

interface License {
  Key: string;
  Record: {
    assetType: string;
    assetId: string;
    creatorId: string;
    licenseDetails: string;
    ownerId: string;
    appId: string;
  };
}

interface CreateAppData {
  title: string;
  description: string;
  rating: string;
  appType: string;
  paymentMethod: string;
  appTags: string[];
  appCategories: string[];
  appIconURL: string;
}

export type { App, License, CreateAppData };
