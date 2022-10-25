export interface App {
  // declare app input
  _id: string;
  title: string;
  description: string;
  rated: string;
  reviewer: string;
  appTag: string;
  downloaded: number;
  appInformations: string;
  feedbacks: [
    {
      name: string;
      content: string;
    }
  ];
}
