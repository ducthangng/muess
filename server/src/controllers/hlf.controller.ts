import { NextFunction, Request, Response } from 'express';
import HLFService from '@/services/hlf.service';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto
} from '@/dtos/hlf.dto';

class HLFController {
  public hlfService = new HLFService();

  public createApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appData: CreateAppDto = req.body;
      const result: any = await this.hlfService.createApp(appData);

      res.status(201).json({ data: result, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public createProposal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const proposalData: CreateProposalDto = req.body;
      const result: any = await this.hlfService.createProposal(proposalData);

      res.status(201).json({ data: result, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public acceptProposal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const acceptProposalData: AcceptProposalDto = req.body;
      const result: any = await this.hlfService.acceptProposal(
        acceptProposalData
      );

      res.status(201).json({ data: result, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAppsByCreatorId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const creatorId: string = req.params.creatorId;
      const appsData: any = await this.hlfService.getAppsByCreatorId(creatorId);

      res.status(200).json({ data: appsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getProposalsByAppId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.appId;
      const proposalsData: any = await this.hlfService.getProposalsByAppId(
        appId
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getProposalsByBuyerId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const buyerId: string = req.params.buyerId;
      const proposalsData: any = await this.hlfService.getProposalsByBuyerId(
        buyerId
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };
}

export default HLFController;
