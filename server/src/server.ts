import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import HLFRoute from '@routes/hlf.route';
import AppsRoute from '@routes/apps.route';

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
});

try {
  validateEnv();
  const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AppsRoute(),
    new AuthRoute(),
    new HLFRoute()
  ]);
  app.listen();
} catch (error) {
  console.log(error);
}
