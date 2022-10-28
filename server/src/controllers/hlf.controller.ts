import { NextFunction, Request, Response } from 'express';
import HLFService from '@/services/hlf.service';
import { AcceptProposalDto, CreateProposalDto } from '@/dtos/hlf.dto';

class HLFController {
  public hlfService = new HLFService();

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

  public getProposalsByAppID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.buyerId;
      const proposalsData: any = await this.hlfService.getProposalsByAppID(
        appId
      );

      res.status(200).json({ data: proposalsData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default HLFController;
