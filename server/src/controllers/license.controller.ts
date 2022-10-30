import { NextFunction, Request, Response } from 'express';
import HLFService from '@/services/hlf.service';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto
} from '@/dtos/hlf.dto';
import { User } from '@/interfaces/users.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';

class HLFController {
  public hlfService = new HLFService();

  public createApp = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appData: CreateAppDto = req.body;
      const user: User = req.user;
      const result: any = await this.hlfService.createApp(user, appData);

      res.status(201).json({ data: result, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public createProposal = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const proposalData: CreateProposalDto = req.body;
      const user: User = req.user;
      const result: any = await this.hlfService.createProposal(
        user,
        proposalData
      );

      res.status(201).json({ data: result, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public acceptProposal = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const acceptProposalData: AcceptProposalDto = req.body;
      const result: any = await this.hlfService.acceptProposal(
        user,
        acceptProposalData
      );

      res.status(201).json({ data: result, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAppsByCreatorId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const creatorId: string = req.params.creatorId;
      const appsData: any = await this.hlfService.getAppsByCreatorId(
        user,
        creatorId
      );

      res.status(200).json({ data: appsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getProposalsByAppId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const appId: string = req.params.appId;
      const proposalsData: any = await this.hlfService.getProposalsByAppId(
        user,
        appId
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getProposalsByBuyerId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const buyerId: string = req.params.buyerId;
      const proposalsData: any = await this.hlfService.getProposalsByBuyerId(
        user,
        buyerId
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getProposalsBySellerID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const buyerId: string = req.params.buyerId;
      const proposalsData: any = await this.hlfService.getProposalsByBuyerID(
        buyerId,
        ''
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public denyProposal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const buyerId: string = req.params.buyerId;
      const proposalsData: any = await this.hlfService.getProposalsByBuyerID(
        buyerId,
        ''
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };
}

export default LicenseController;
