import { App, CreateAppData } from '@interfaces/apps.interface';
import appModel from '@/models/apps.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class AppService {
  public apps = appModel;

  public async findAllApp(): Promise<App[]> {
    const apps: App[] = await this.apps.find();
    return apps;
  }

  public async findAppById(appId: string): Promise<App> {
    if (isEmpty(appId)) throw new HttpException(400, 'AppId is empty');

    const findApp: App = await this.apps.findOne({ _id: appId });
    if (!findApp) throw new HttpException(409, "App doesn't exist");

    return findApp;
  }

  public async createApp(appData: CreateAppData): Promise<App> {
    if (isEmpty(appData)) throw new HttpException(400, 'appData is empty');

    console.log('creating ... ');
    const findApp: App = await this.apps.findOne({ title: appData.title });
    if (findApp)
      throw new HttpException(409, `This name ${appData.title} already exists`);

    try {
      const createAppData: App = await this.apps.create({
        ...appData
      });

      console.log('app adata daydayda ...:  ', createAppData);
      return createAppData;
    } catch (err) {
      console.log('hello loi ne: ', err);
    }
  }

  public async updateApp(appData: App): Promise<App> {
    if (isEmpty(appData)) throw new HttpException(400, 'appData is empty');

    if (appData.title) {
      const findApp: App = await this.apps.findOne({
        name: appData.title
      });
      if (findApp && findApp._id != '')
        throw new HttpException(
          409,
          `This name ${appData.title} already exists`
        );
    }

    const updateAppById: App = await this.apps.findByIdAndUpdate(
      appData._id,
      appData
    );
    if (!updateAppById) throw new HttpException(409, "App doesn't exist");

    return updateAppById;
  }

  public async deleteApp(appId: string): Promise<App> {
    const deleteAppById: App = await this.apps.findByIdAndDelete(appId);
    if (!deleteAppById) throw new HttpException(409, "App doesn't exist");

    return deleteAppById;
  }
}

export default AppService;
