import { CreateAppDto } from '@dtos/apps.dto';
import { App, CreateAppData } from '@interfaces/apps.interface';
import appService from '@services/apps.service';
import { Request, NextFunction, Response } from 'express';

class AppsController {
  public appService = new appService();

  public getAllApps = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllAppsData: App[] = await this.appService.findAllApp();

      res.status(200).json({ data: findAllAppsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAppById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.id;
      const findOneAppData: App = await this.appService.findAppById(appId);

      res.status(200).json({ data: findOneAppData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);
      const appData: CreateAppData = req.body;

      appData.creatorId = 'ducthang_id';
      appData.creatorName = 'ducthang';
      appData.rated = '16+';
      const createAppData: App = await this.appService.createApp(appData);

      res.status(201).json({ data: createAppData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appData: App = req.body;
      const updateAppData: App = await this.appService.updateApp(appData);

      res.status(200).json({ data: updateAppData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.id;
      const deleteAppData: App = await this.appService.deleteApp(appId);

      res.status(200).json({ data: deleteAppData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AppsController;
