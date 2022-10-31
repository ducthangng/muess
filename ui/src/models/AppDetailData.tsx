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
  _id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  rated: string;
  appType: string;
  appPaymentMethod: string;
  appCategories: string;
  appTags: string[];
  reviewer: string;
  downloaded: number;
  imageSrc: string;
  license: string;
  appIcon: string;
  feedbacks: [
    {
      name: string;
      content: string;
    }
  ];
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
