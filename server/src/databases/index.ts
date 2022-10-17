import { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_DATABASE } from '@config';

console.log(DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_DATABASE);
export const dbConnection = {
  url: `mongodb+srv://admin:Muessen@cluster0.7dou6.mongodb.net/?retryWrites=true&w=majority`,
  options: {}
};
