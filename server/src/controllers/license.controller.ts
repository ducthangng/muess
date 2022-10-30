import { NextFunction, Request, Response } from 'express';
import HLFService from '@/services/hlf.service';
import { SECRET_KEY } from '@config';
import { sign, verify, decode } from 'jsonwebtoken';
import { AcceptProposalDto, CreateProposalDto } from '@/dtos/hlf.dto';

class LicenseController {
  public hlfService: HLFService;

  constructor() {
    this.hlfService = new HLFService();
    console.log('init hlf controller');
    this.hlfService.enrollAdmin();
  }

  public createLicenseProposal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const secretKey: string = SECRET_KEY;
      const token = req.cookies['muess'].token;
      const decoded = decode(token, { complete: true, json: true });

      // const proposalData: CreateProposalDto = req.body;
      // const result: any = await this.hlfService.createProposal(proposalData);

      res.status(201).json({ data: decoded, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public acceptLicenseProposal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const acceptProposalData: AcceptProposalDto = req.body;
      const result: any = await this.hlfService.acceptProposal(
        acceptProposalData,
        ''
      );

      res.status(201).json({ data: result, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getLicenseProposalsByAppID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.appId;
      const proposalsData: any = await this.hlfService.getProposalsByAppID(
        appId,
        ''
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getLicenseDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.appId;
      const proposalsData: any = await this.hlfService.getProposalsByAppID(
        appId,
        ''
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getLicenseByAppID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.appId;
      const proposalsData: any = await this.hlfService.getProposalsByAppID(
        appId,
        ''
      );

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getProposalsByBuyerID = async (
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
