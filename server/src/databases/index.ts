import { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`,
  options: {}
};
