export interface App {
  // declare app input
  _id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  rated: string;
  appType: string;
  appPaymentMethod: string;
  appCategories: string[];
  appTags: string[];
  reviewer: string;
  downloaded: number;
  imageSrc: string;
  appIcon: string; // link to database.
  feedbacks: [
    {
      name: string;
      content: string;
    }
  ];
}

export interface CreateAppData {
  // declare app input
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  rated: string;
  appType: string;
  appPaymentMethod: string;
  appCategories: string[];
  appTags: string[];
  reviewer: string;
  downloaded: number;
  imageSrc: string;
  appIcon: string; // link to database.
  feedbacks: [
    {
      name: string;
      content: string;
    }
  ];
}
