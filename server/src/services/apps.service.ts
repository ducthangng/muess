import { App } from '@interfaces/apps.interface';
import appModel from '@/models/apps.model';
import { CreateAppDto } from '@dtos/apps.dto';
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

  public async createApp(appData: CreateAppDto): Promise<App> {
    if (isEmpty(appData)) throw new HttpException(400, 'appData is empty');

    const findApp: App = await this.apps.findOne({ name: appData.name });
    if (findApp)
      throw new HttpException(
        409,
        `This name ${appData.name} already exists`
      );
    const createAppData: App = await this.apps.create({
      ...appData
    });

    return createAppData;
  }

  public async updateApp(
    appId: string,
    appData: CreateAppDto
  ): Promise<App> {
    if (isEmpty(appData)) throw new HttpException(400, 'appData is empty');

    if (appData.name) {
      const findApp: App = await this.apps.findOne({
        name: appData.name
      });
      if (findApp && findApp._id != appId)
        throw new HttpException(
          409,
          `This name ${appData.name} already exists`
        );
    }

    const updateAppById: App = await this.apps.findByIdAndUpdate(appId, {
      appData, function(err, docs) {
        if (err) {
          console.log(err)
        }
        else {
          console.log("Updated User : ", docs);
        }
      }
    });
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