import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

try {
  validateEnv();
  const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);
  app.listen();
} catch (error) {
  console.log(error);
}
