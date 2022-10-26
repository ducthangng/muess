import React from 'react';

interface AppDetailData {
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
  appIcon: string; // link to database.
  feedbacks: [
    {
      name: string;
      content: string;
    }
  ];
}

interface CreateAppData {
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
  appIcon: string; // link to database.
  feedbacks: [
    {
      name: string;
      content: string;
    }
  ];
}

export type { AppDetailData, CreateAppData };
